package store

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"v0/models"
	"v0/pkg"

	"github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
)

func CreateUser(item models.User) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_USER")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	ctx := context.TODO()

	item.Live = cosmosPartition
	bytes, err := json.Marshal(item)
	if err != nil {
		return nil, err
	}
	response, err := container.UpsertItem(ctx, partitionKey, bytes, nil)
	if err != nil {
		return nil, err
	}

	return pkg.ParseCosmosResponse(response.RawResponse.Body)
}

func RemoveUser(id string) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_USER")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	ctx := context.TODO()

	response, err := container.DeleteItem(ctx, partitionKey, id, nil)
	if err != nil {
		return nil, err
	}

	return pkg.ParseCosmosResponse(response.RawResponse.Body)
}

func GetUserByUsername(username string) (*models.User, error) {
	cosmosPartition := os.Getenv("COSMOS_USER")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	queryString := "SELECT * FROM c WHERE c.live = @live AND c.username = @username"
	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	query := azcosmos.QueryOptions{
		QueryParameters: []azcosmos.QueryParameter{
			{Name: "@live", Value: cosmosPartition},
			{Name: "@username", Value: username},
		},
	}

	pager := container.NewQueryItemsPager(queryString, partitionKey, &query)
	ctx := context.TODO()

	response, err := pager.NextPage(ctx)
	if err != nil {
		return nil, err
	}

	if len(response.Items) == 0 {
		return nil, errors.New("user not found")
	}

	var user models.User
	if err := json.Unmarshal(response.Items[0], &user); err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUserSettings(username string, settings models.Settings) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_USER")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	userObj, err := GetUserByUsername(username)
	if err != nil {
		return nil, err
	}

	userObj.Settings = settings
	bytes, err := json.Marshal(userObj)
	if err != nil {
		return nil, err
	}

	ctx := context.TODO()
	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	updateResp, err := container.UpsertItem(ctx, partitionKey, bytes, nil)
	if err != nil {
		return nil, err
	}

	return pkg.ParseCosmosResponse(updateResp.RawResponse.Body)
}
