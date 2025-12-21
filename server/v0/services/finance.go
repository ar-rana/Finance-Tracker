package service

import (
	"encoding/json"
	"errors"
	"net/http"
	"v0/models"
	"v0/pkg"
	"v0/store"
)

func DBConnectionCheck(w http.ResponseWriter, r *http.Request) (any, error) {
	switch r.Method {
	case http.MethodPost:
		result, err := store.WriteToCosmosDBTest()
		if err != nil {
			return nil, err
		}
		return result, nil
	default:
		return nil, errors.New("method not allowed")
	}
}

func addExpense(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var expense models.Expense
		if err := json.NewDecoder(r.Body).Decode(&expense); err != nil {
			pkg.SendERR(w, nil, "Invalid request body")
			return
		}

	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}

}
