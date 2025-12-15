package pkg

import (
	"encoding/json"
	"net/http"
	"v0/models"
)

func SendOK(w http.ResponseWriter, resp map[string]any, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(models.Response{
		Message: message,
		Data:    resp,
		Success: true,
	}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func SendERR(w http.ResponseWriter, resp map[string]any, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(400)

	if err := json.NewEncoder(w).Encode(models.Response{
		Message: message,
		Data:    resp,
		Success: false,
	}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
