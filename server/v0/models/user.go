package models

type Settings struct {
	GraphPreferences []string `json:"graph_preferences"`
	Budget           string   `json:"budget"`
	Timeline         string   `json:"timeline"`
}

type User struct {
	Email    string   `json:"email"`
	Password string   `json:"password"`
	Settings Settings `json:"settings"`
}
