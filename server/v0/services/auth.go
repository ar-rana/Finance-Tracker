package service

import (
	"errors"
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

func VerifyToken(tokenString string) error {
	if secretKey == "" {
		return errors.New("missing JWT variable KEY")
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return errors.New("invalid token")
	}

	return nil
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
		err := VerifyToken(tokenString)
		if err != nil {
			pkg.SendERR(w, nil, "Unauthorized - "+err.Error())
			return
		}

		next(w, r)
	}
}
