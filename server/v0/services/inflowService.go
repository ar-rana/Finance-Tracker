package service

import (
	"v0/models"
	"v0/store"

	"github.com/google/uuid"
)

func CreateNewInflow(item models.Inflow) (map[string]any, error) {
	var id string = uuid.New().String()
	item.Id = id
	
	return store.CreateInflow(item)
}

func RemoveInflowItem(id string) (map[string]any, error) {
	return store.RemoveInflow(id)
}

func GetInflowsRange(start string, end string) ([]models.Inflow, error) {
	return store.GetInflows(start, end)
}