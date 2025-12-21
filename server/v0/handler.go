package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"v0/pkg"
	service "v0/services"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	message := "This http funcion has been executed and triggered"
	name := r.URL.Query().Get("name")
	if name != "" {
		message = fmt.Sprintf("Hello, %s, HTTP trigger exucted", name)
	}
	if val, ok := os.LookupEnv("ENV_CHECK"); ok {
		log.Printf("Env Accesed: %s", val)
	} else {
		log.Printf("Env Acessed: false")
	}
	pkg.SendOK(w, message, "Server active and running")
}

func goodHandler(w http.ResponseWriter, r *http.Request) {
	message := "This http funcion is good"
	if val, ok := os.LookupEnv("ENV_CHECK"); ok {
		log.Printf("Env Accesed: %s", val)
	} else {
		log.Printf("Env Acessed: false")
	}
	pkg.SendOK(w, message, "Server active and running")
}

func DBConnectionCheckHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		result, err := service.DBConnectionCheck(w, r)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "DB Connection Checked")
		return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func main() {
	log.SetOutput(os.Stderr)
	listenAddr := ":8080"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		listenAddr = ":" + val
	}

	http.HandleFunc("/api/v0", helloHandler)
	http.HandleFunc("/api/v0/good", goodHandler)
	http.HandleFunc("/api/v0/db-connection-check", DBConnectionCheckHandler)
	log.Printf("listening on localhost%s", listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))
}
