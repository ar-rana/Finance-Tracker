package pkg

import (
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"time"
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

	// Handle empty body (e.g., Status 204 No Content)
	if len(bodyBytes) == 0 {
		return make(map[string]any), nil
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

func BodyParser[T any](w http.ResponseWriter, r *http.Request) (T, error) {
	var item T
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		SendERR(w, nil, "Invalid request body")
		return item, err
	}
	return item, nil
}

func ParseDate(dateStr string) (int, string, int, time.Time, error) {
	// Support both / and - separators
	normalizedDate := strings.ReplaceAll(dateStr, "-", "/")
	t, err := time.Parse("02/01/2006", normalizedDate) // - date/month/year
	if err != nil {
		return 0, "", 0, time.Time{}, err
	}

	monthNames := []string{
		"january", "february", "march", "april", "may", "june",
		"july", "august", "september", "october", "november", "december",
	}

	// day, month (string), year, full-time
	return t.Day(), monthNames[t.Month()-1], t.Year(), t, nil
}
