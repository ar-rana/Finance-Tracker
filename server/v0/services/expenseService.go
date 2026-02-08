package service

import (
	"v0/models"
	"v0/store"

	"github.com/google/uuid"
)

func CreateNewExpense(item models.Expense) (map[string]any, error) {
	var id string = uuid.New().String()
	item.Id = id
	
	return store.CreateExpense(item)
}

func RemoveExpenseItem(id string) (map[string]any, error) {
	return store.RemoveExpense(id)
}

func GetExpensesRange(start string, end string) ([]models.Expense, error) {
	return store.GetExpenses(start, end)
}