package models

type Expense struct {
	Amount      int64  `json:"amount"`
	Category    string `json:"category"`
	Month       string `json:"month"`
	Description string `json:"description"`
	Year        int32  `json:"year"`
}

type Inflow struct {
	Amount      int64  `json:"amount"`
	Source      string `json:"source"`
	Month       string `json:"month"`
	Description string `json:"description"`
	Year        int32  `json:"year"`
}

type Stocks struct {
	Amount   int64   `json:"amount"`
	Company  string  `json:"company"`
	Price    float64 `json:"price"`
	Quantity int64   `json:"quantity"`
	Date     string  `json:"date"`
	Status   string  `json:"status"`
}

type Awards struct {
	Month string `json:"amount"`
	Year  string `json:"date"`
	Award string `json:"award"`
	User  string `json:"user"`
}
