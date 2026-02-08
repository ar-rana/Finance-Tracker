package service

import (
	"v0/models"
	"v0/store"

	"github.com/google/uuid"
)

func CreateNewStock(item models.Stocks) (map[string]any, error) {
	var id string = uuid.New().String()
	item.Id = id
	
	return store.CreateStock(item)
}

func RemoveStockItem(id string) (map[string]any, error) {
	return store.RemoveStock(id)
}

func GetStocksRange(start string, end string) ([]models.Stocks, error) {
	return store.GetStocks(start, end)
}
