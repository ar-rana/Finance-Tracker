package store

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"os"
	"v0/models"
	"v0/pkg"

	"github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
)

func CreateAward(item models.Awards) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_AWARDS")
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

func RemoveAward(id string) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_AWARD")
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

func GetAwards(user string) ([]models.Awards, error) {
	cosmosPartition := os.Getenv("COSMOS_AWARDS")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	queryString := "SELECT * FROM c WHERE c.live = @live AND c.user = @user"

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	query := azcosmos.QueryOptions{
		QueryParameters: []azcosmos.QueryParameter{
			{Name: "@live", Value: cosmosPartition},
			{Name: "@user", Value: user},
		},
	}

	pager := container.NewQueryItemsPager(queryString, partitionKey, &query)
	var awards []models.Awards
	ctx := context.TODO()

	for pager.More() {
		response, err := pager.NextPage(ctx)
		if err != nil {
			return nil, err
		}

		for _, itemBytes := range response.Items {
			var award models.Awards
			if err := json.Unmarshal(itemBytes, &award); err != nil {
				log.Printf("Failed to unmarshal award: %v", err)
				continue
			}
			awards = append(awards, award)
		}
	}

	return awards, nil
}
