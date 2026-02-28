package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"v0/pkg"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey string = os.Getenv("JWT_SECRET_KEY")

func CreateToken(username string) (string, error) {
	if secretKey == "" {
		return "", errors.New("missing JWT variable KEY")
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Add(time.Hour * 720).Unix(), // Token expires in 30 days (720 hours)
		})

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (string, error) {
	if secretKey == "" {
		return "", errors.New("missing JWT variable KEY")
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return "", err
	}

	if !token.Valid {
		return "", errors.New("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	username, ok := claims["username"].(string)
	if !ok {
		return "", errors.New("username not found in token")
	}

	return username, nil
}

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			pkg.SendERR(w, nil, "Unauthorized - Missing Authorization Header")
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			pkg.SendERR(w, nil, "Unauthorized - Invalid Authorization Header Format")
			return
		}

		tokenString := parts[1]
		username, err := VerifyToken(tokenString)
		if err != nil {
			pkg.SendERR(w, nil, "Unauthorized - "+err.Error())
			return
		}

		r.Header.Set("X-Username", username)

		if r.Method == http.MethodPost || r.Method == http.MethodPut || r.Method == http.MethodPatch {
			bodyBytes, err := io.ReadAll(r.Body)
			if err == nil {
				r.Body.Close()
				var bodyMap map[string]interface{}
				if len(bodyBytes) > 0 {
					if err := json.Unmarshal(bodyBytes, &bodyMap); err == nil {
						bodyMap["username"] = username
						newBodyBytes, _ := json.Marshal(bodyMap)
						r.Body = io.NopCloser(bytes.NewBuffer(newBodyBytes))
						r.ContentLength = int64(len(newBodyBytes))
					} else {
						r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
					}
				} else {
					bodyMap = map[string]interface{}{"username": username}
					newBodyBytes, _ := json.Marshal(bodyMap)
					r.Body = io.NopCloser(bytes.NewBuffer(newBodyBytes))
					r.ContentLength = int64(len(newBodyBytes))
				}
			}
		}

		next(w, r)
	}
}
