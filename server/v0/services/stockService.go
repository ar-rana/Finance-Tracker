package service

import (
	"fmt"
	"v0/models"
	"v0/pkg"
	"v0/store"

	"github.com/google/uuid"
)

func CreateNewStock(item models.Stocks) (map[string]any, error) {
	var id string = uuid.New().String()
	item.Id = id

	// store Unix timestamp in DateUnix
	_, _, _, t, err := pkg.ParseDate(item.Date)
	if err != nil {
		return nil, err
	}
	item.DateUnix = t.Unix()
	
	return store.CreateStock(item)
}

func RemoveStockItem(id string) (map[string]any, error) {
	return store.RemoveStock(id)
}

func GetStocksRange(start string, end string) ([]models.Stocks, error) {

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
	
	return store.GetStocks(startTS, endTS)
}
