package store

import (
	"errors"
	"os"

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