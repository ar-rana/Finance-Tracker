package models

type Settings struct {
	GraphPreferences []string `json:"graph_preferences"`
	Budget           int32    `json:"budget"`
	Timeline         string   `json:"timeline"`
}

type User struct {
	Id       string   `json:"id"`
	Live     string   `json:"live"`
	Username string   `json:"username"`
	Password string   `json:"password"`
	Settings Settings `json:"settings"`
}
