package service

import (
	"errors"
	"os"
	"strings"
	"v0/models"
	"v0/pkg"
	"v0/store"

	"github.com/google/uuid"
)

var DefaultSettings = models.Settings{
	GraphPreferences: []string{"Bar_Graphs", "Radar_Chart", "Line_Graph"},
	Budget:           10000,
	Start:            "",
	End:              "",
}

func CreateNewUser(item models.User) (map[string]any, error) {
	// Check if user already exists
	existingUser, _ := store.GetUserByUsername(item.Username)
	if existingUser != nil {
		return nil, errors.New("user already exists")
	}

	whiteListed, err := checkWhiteListedUser(item.Username)
	if err != nil {
		return nil, err
	}
	if !whiteListed {
		return nil, errors.New("user is not whitelisted")
	}

	var id string = uuid.New().String()
	item.Id = id

	// Hash password
	// hashedPassword, err := pkg.Hash(item.Password)
	// if err != nil {
	// 	return nil, err
	// }
	// item.Password = hashedPassword

	// Set default settings
	item.Settings = DefaultSettings

	user, err := store.CreateUser(item)
	user["password"] = nil
	return user, err
}

func Login(username string, password string) (models.UserDTO, error) {
	user, err := store.GetUserByUsername(username)
	if err != nil {
		return models.UserDTO{}, errors.New("invalid username or password")
	}

	// Password check
	if !pkg.CompareHash(password, user.Password) {
		return models.UserDTO{}, errors.New("invalid username or password")
	}

	token, err := CreateToken(username)
	if err != nil {
		return models.UserDTO{}, err
	}

	return models.UserDTO{
		Username: user.Username,
		Token:    token,
	}, nil
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

func UpdateUserSettings(username string, settings models.Settings) (models.Settings, error) {
	_, err := store.UpdateUserSettings(username, settings)
	return settings, err
}

func checkWhiteListedUser(user string) (bool, error) {
	whitelistedUsers := os.Getenv("WHITE_LISTED_USERS")
	if whitelistedUsers == "" {
		return false, errors.New("missing cosmos partition env var")
	}

	users := strings.Split(whitelistedUsers, ",")
	for _, u := range users {
		if u == user {
			return true, nil
		}
	}
	return false, nil
}
