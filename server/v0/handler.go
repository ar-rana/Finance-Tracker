package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
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
	fmt.Println("ENV_CHECK reached")
	fmt.Fprint(w, message)
}

func goodHandler(w http.ResponseWriter, r *http.Request) {
	message := "This http funcion is good"
	if val, ok := os.LookupEnv("ENV_CHECK"); ok {
		log.Printf("Env Accesed: %s", val)
	} else {
		log.Printf("Env Acessed: false")
	}
	fmt.Println("ENV_CHECK reached")
	fmt.Fprint(w, message)
	fmt.Fprint(w, message)
}

func main() {
	log.SetOutput(os.Stderr)
	listenAddr := ":8080"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		listenAddr = ":" + val
	}

	http.HandleFunc("/api/v0", helloHandler)
	http.HandleFunc("/api/v0/good", goodHandler)
	log.Printf("listening on localhost%s", listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))
}
