package models

type Expense struct {
	Id          string `json:"id"`
	Live        string `json:"live"`
	Amount      int64  `json:"amount"`
	Category    string `json:"category"`
	Month       string `json:"month"`
	Description string `json:"description"`
	Year        int32  `json:"year"`
}

type Inflow struct {
	Id          string `json:"id"`
	Live        string `json:"live"`
	Type        string `json:"type"`
	Amount      int64  `json:"amount"`
	Source      string `json:"source"`
	Month       string `json:"month"`
	Description string `json:"description"`
	Year        int32  `json:"year"`
}

type Stocks struct {
	Id   string `json:"id"`
	Live string `json:"live"`
	Type string `json:"type"`
	// Amount   int64   `json:"amount"`
	Company  string  `json:"company"`
	Price    float64 `json:"price"`
	Quantity int64   `json:"quantity"`
	Date     string  `json:"date"`
	DateUnix int64   `json:"dateUnix"`
	Status   string  `json:"status"`
}

type Awards struct {
	Id    string `json:"id"`
	Live  string `json:"live"`
	Type  string `json:"type"`
	Month string `json:"amount"`
	Year  string `json:"date"`
	Award string `json:"award"`
	User  string `json:"user"`
}
