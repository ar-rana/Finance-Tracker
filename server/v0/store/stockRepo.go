package store

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"v0/models"
	"v0/pkg"

	"github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
)

func CreateStock(item models.Stocks) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_STOCKS")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}
	log.Printf("partition key: %s", cosmosPartition)

	container, err := ConnectToCosmosDB()
	if err != nil {
		log.Printf("Failed to connect to Cosmos DB")
		return nil, err
	}

	// store Unix timestamp in DateUnix
	_, _, _, t, err := pkg.ParseDate(item.Date)
	if err != nil {
		return nil, err
	}
	item.DateUnix = t.Unix()

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	context := context.TODO()

	item.Live = cosmosPartition
	bytes, err := json.Marshal(item)
	if err != nil {
		log.Printf("Failed to marshal item")
		return nil, err
	}
	response, err := container.UpsertItem(context, partitionKey, bytes, nil)
	if err != nil {
		return nil, err
	}

	log.Printf("Item written to Cosmos DB. Status: %d", response.RawResponse.StatusCode)
	return pkg.ParseCosmosResponse(response.RawResponse.Body)
}

func RemoveStock(id string) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_STOCKS")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}
	log.Printf("partition key: %s", cosmosPartition)

	container, err := ConnectToCosmosDB()
	if err != nil {
		log.Printf("Failed to connect to Cosmos DB")
		return nil, err
	}

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	context := context.TODO()

	response, err := container.DeleteItem(context, partitionKey, id, nil)
	if err != nil {
		return nil, err
	}

	log.Printf("Item deleted from Cosmos DB. Status: %d", response.RawResponse.StatusCode)
	return pkg.ParseCosmosResponse(response.RawResponse.Body)
}

func GetStocks(start string, end string) ([]models.Stocks, error) {
	cosmosPartition := os.Getenv("COSMOS_STOCKS")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	_, _, _, startTime, err := pkg.ParseDate(start)
	if err != nil {
		return nil, fmt.Errorf("invalid start date: %v", err)
	}
	_, _, _, endTime, err := pkg.ParseDate(end)
	if err != nil {
		return nil, fmt.Errorf("invalid end date: %v", err)
	}

	// Use Unix timestamps for range comparison in Cosmos DB
	startTS := startTime.Unix()
	endTS := endTime.Unix()

	queryString := "SELECT * FROM c WHERE c.live = @live AND c.dateUnix >= @start AND c.dateUnix <= @end"
	
	log.Printf("Query: %s", queryString)

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	query := azcosmos.QueryOptions{
		QueryParameters: []azcosmos.QueryParameter{
			{Name: "@live", Value: cosmosPartition},
			{Name: "@start", Value: startTS},
			{Name: "@end", Value: endTS},
		},
	}

	pager := container.NewQueryItemsPager(queryString, partitionKey, &query)
	var stocks []models.Stocks
	ctx := context.TODO()

	for pager.More() {
		response, err := pager.NextPage(ctx)
		if err != nil {
			return nil, err
		}

		for _, itemBytes := range response.Items {
			var stock models.Stocks
			if err := json.Unmarshal(itemBytes, &stock); err != nil {
				log.Printf("Failed to unmarshal stock: %v", err)
				continue
			}
			stocks = append(stocks, stock)
		}
	}

	// Optional: Filter stocks by date range in Go if needed
	// ...

	return stocks, nil
}
