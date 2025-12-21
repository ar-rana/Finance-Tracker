package pkg

import (
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"v0/models"
)

func SendOK(w http.ResponseWriter, resp any, message string) {
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

func SendERR(w http.ResponseWriter, resp any, message string) {
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

func ParseCosmosResponse(body io.ReadCloser) (map[string]any, error) {
	defer body.Close()

	// Read the body
	bodyBytes, err := io.ReadAll(body)
	if err != nil {
		return nil, err
	}

	// Parse as JSON
	var result map[string]any
	if err := json.Unmarshal(bodyBytes, &result); err != nil {
		return nil, err
	}

	// Remove internal Cosmos DB fields (those starting with _)
	cleanResult := make(map[string]any)
	for key, value := range result {
		if !strings.HasPrefix(key, "_") {
			cleanResult[key] = value
		}
	}

	return cleanResult, nil
}
