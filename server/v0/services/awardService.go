package service

import (
	"v0/models"
	"v0/store"

	"github.com/google/uuid"
)

func CreateNewAward(item models.Awards) (map[string]any, error) {
	var id string = uuid.New().String()
	item.Id = id

	// TO-DO - ADD User here in this step

	return store.CreateAward(item)
}

func RemoveAwardItem(id string) (map[string]any, error) {
	return store.RemoveAward(id)
}

func GetAllAwardsByUser(user string) ([]models.Awards, error) {
	return store.GetAwards(user)
}
