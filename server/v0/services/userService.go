package service

import (
	"errors"
	"v0/models"
	"v0/store"

	"github.com/google/uuid"
)

var DefaultSettings = models.Settings{
	GraphPreferences: []string{"Bar_Graphs", "Radar_Chart", "Line_Graph"},
	Budget:           10000,
	Timeline:         "monthly",
}

func CreateNewUser(item models.User) (map[string]any, error) {
	// Check if user already exists
	existingUser, _ := store.GetUserByUsername(item.Username)
	if existingUser != nil {
		return nil, errors.New("user already exists")
	}

	var id string = uuid.New().String()
	item.Id = id

	// Hash password
	// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(item.Password), bcrypt.DefaultCost)
	// if err != nil {
	// 	return nil, err
	// }
	// item.Password = string(hashedPassword)

	// Set default settings
	item.Settings = DefaultSettings

	return store.CreateUser(item)
}

func RemoveUserItem(id string) (map[string]any, error) {
	return store.RemoveUser(id)
}

func GetUserSettings(username string) (models.Settings, error) {
	user, err := store.GetUserByUsername(username)
	if err != nil {
		return models.Settings{}, errors.New("user does not exist")
	}
	return user.Settings, nil
}

func UpdateUserSettings(user string, settings models.Settings) (map[string]any, error) {
	return store.UpdateUserSettings(user, settings)
}
