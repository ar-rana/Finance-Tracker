package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"v0/models"
	"v0/pkg"
	service "v0/services"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	message := "This http funcion has been executed through triggered"
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

func ExpenseHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.Expense](w, r)
		if err != nil {
			return
		}

		result, err := service.CreateNewExpense(item)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Expense created successfully")
		return
	case http.MethodDelete:
		id := r.URL.Query().Get("id")
		if id == "" {
			pkg.SendERR(w, nil, "id is required")
			return
		}

		result, err := service.RemoveExpenseItem(id)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Expense removed successfully")
		return
	case http.MethodGet:
		start := r.URL.Query().Get("start")
		end := r.URL.Query().Get("end")
		if start == "" || end == "" {
			pkg.SendERR(w, nil, "start and end dates are required")
			return
		}

		result, err := service.GetExpensesRange(start, end)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Expenses fetched successfully")
		return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func InflowHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.Inflow](w, r)
		if err != nil {
			return
		}

		result, err := service.CreateNewInflow(item)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Inflow created successfully")
		return
	case http.MethodDelete:
		id := r.URL.Query().Get("id")
		if id == "" {
			pkg.SendERR(w, nil, "id is required")
			return
		}

		result, err := service.RemoveInflowItem(id)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Inflow removed successfully")
		return
	case http.MethodGet:
		start := r.URL.Query().Get("start")
		end := r.URL.Query().Get("end")
		if start == "" || end == "" {
			pkg.SendERR(w, nil, "start and end dates are required")
			return
		}

		result, err := service.GetInflowsRange(start, end)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Inflows fetched successfully")
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
	// http.HandleFunc("/api/v0/db-connection-check", DBConnectionCheckHandler)

	// EXPENSE
	http.HandleFunc("/api/v0/expense", ExpenseHandler)

	// INFLOW
	http.HandleFunc("/api/v0/inflow", InflowHandler)

	// STOCK
	// http.HandleFunc("/api/v0/stock", StockHandler)

	log.Printf("listening on localhost%s", listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))
}
