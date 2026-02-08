package store

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"
	"time"
	"v0/models"
	"v0/pkg"

	"github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos"
)

func CreateInflow(item models.Inflow) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_INFLOW")
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

func RemoveInflow(id string) (map[string]any, error) {
	cosmosPartition := os.Getenv("COSMOS_INFLOW")
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

func GetInflows(startStr string, endStr string) ([]models.Inflow, error) {
	cosmosPartition := os.Getenv("COSMOS_INFLOW")
	if cosmosPartition == "" {
		return nil, errors.New("missing cosmos partition env var")
	}

	container, err := ConnectToCosmosDB()
	if err != nil {
		return nil, err
	}

	_, _, _, startTime, err := pkg.ParseDate(startStr)
	if err != nil {
		return nil, fmt.Errorf("invalid start date: %v", err)
	}
	_, _, _, endTime, err := pkg.ParseDate(endStr)
	if err != nil {
		return nil, fmt.Errorf("invalid end date: %v", err)
	}

	// Map to store months per year
	yearMonths := make(map[int][]string)
	current := time.Date(startTime.Year(), startTime.Month(), 1, 0, 0, 0, 0, time.UTC)
	end := time.Date(endTime.Year(), endTime.Month(), 1, 0, 0, 0, 0, time.UTC)

	for !current.After(end) {
		y := current.Year()
		m := current.Month().String()
		yearMonths[y] = append(yearMonths[y], m)
		current = current.AddDate(0, 1, 0)
	}

	// Build query
	var queryConditions []string
	for year, months := range yearMonths {
		mList := ""
		for i, m := range months {
			if i > 0 {
				mList += ", "
			}
			mList += fmt.Sprintf("'%s'", m)
		}
		queryConditions = append(queryConditions, fmt.Sprintf("(c.year = %d AND c.month IN (%s))", year, mList))
	}

	queryString := "SELECT * FROM c WHERE c.live = @live"
	
	if len(queryConditions) > 0 {
		queryString += " AND (" + strings.Join(queryConditions, " OR ") + ")"
	}

	log.Printf("Query: %s", queryString)

	partitionKey := azcosmos.NewPartitionKeyString(cosmosPartition)
	query := azcosmos.QueryOptions{
		QueryParameters: []azcosmos.QueryParameter{
			{Name: "@live", Value: cosmosPartition},
		},
	}

	pager := container.NewQueryItemsPager(queryString, partitionKey, &query)
	var inflows []models.Inflow
	ctx := context.TODO()

	for pager.More() {
		response, err := pager.NextPage(ctx)
		if err != nil {
			return nil, err
		}

		for _, itemBytes := range response.Items {
			var inflow models.Inflow
			if err := json.Unmarshal(itemBytes, &inflow); err != nil {
				log.Printf("Failed to unmarshal inflow: %v", err)
				continue
			}
			inflows = append(inflows, inflow)
		}
	}

	return inflows, nil
}