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

func ConnectToCosmosDB() (*azcosmos.ContainerClient, error) {
	cosmosHost := os.Getenv("AZURE_COSMOS_HOST")
	cosmosKey := os.Getenv("AZURE_COSMOS_KEY")
	cosmosDB := os.Getenv("AZURE_COSMOS_DATABASE")
	cosmosContainer := os.Getenv("AZURE_COSMOS_CONTAINER")

	if cosmosHost == "" || cosmosKey == "" || cosmosDB == "" || cosmosContainer == "" {
		return nil, errors.New("missing cosmos env vars")
	}

	credential, err := azcosmos.NewKeyCredential(cosmosKey)
	if err != nil {
		return nil, err
	}

	clientOptions := azcosmos.ClientOptions{
		EnableContentResponseOnWrite: true,
	}
	client, err := azcosmos.NewClientWithKey(cosmosHost, credential, &clientOptions)
	if err != nil {
		return nil, err
	}

	database, err := client.NewDatabase(cosmosDB)
	if err != nil {
		return nil, err
	}

	container, err := database.NewContainer(cosmosContainer)
	if err != nil {
		return nil, err
	}

	return container, nil
}

func WriteToCosmosDBTest() (any, error) {
	cosmosPartition := os.Getenv("AZURE_COSMOS_PARTITION")
	if cosmosPartition == "" {
		return "", errors.New("missing cosmos partition env var")
	}
	log.Printf("partition key: %s", cosmosPartition)

	container, err := ConnectToCosmosDB()
	if err != nil {
		log.Printf("Failed to connect to Cosmos DB")
		return "", err
	}
	item := models.Expense{
		Id:          "test",
		Live:        cosmosPartition,
		Amount:      100,
		Category:    "Test",
		Month:       "January",
		Description: "Test",
		Year:        2025,
	}
	partitionKey := azcosmos.NewPartitionKeyString(item.Live)
	context := context.TODO()

	bytes, err := json.Marshal(item)
	if err != nil {
		log.Printf("Failed to marshal item")
		return "", err
	}
	response, err := container.UpsertItem(context, partitionKey, bytes, nil)
	if err != nil {
		return "", err
	}

	log.Printf("Item written to Cosmos DB. Status: %s", response.RawResponse.Body)
	return pkg.ParseCosmosResponse(response.RawResponse.Body)
}
