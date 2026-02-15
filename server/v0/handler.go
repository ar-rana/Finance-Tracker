package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
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
	pkg.SendOK(w, message, "Server active and running, env: "+os.Getenv("ENV_CHECK"))
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

func StockHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.Stocks](w, r)
		if err != nil {
			return
		}

		result, err := service.CreateNewStock(item)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Stock created successfully")
		return
	case http.MethodDelete:
		id := r.URL.Query().Get("id")
		if id == "" {
			pkg.SendERR(w, nil, "id is required")
			return
		}

		result, err := service.RemoveStockItem(id)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Stock removed successfully")
		return
	case http.MethodGet:
		start := r.URL.Query().Get("start")
		end := r.URL.Query().Get("end")
		if start == "" || end == "" {
			pkg.SendERR(w, nil, "start and end dates are required")
			return
		}

		result, err := service.GetStocksRange(start, end)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Stocks fetched successfully")
		return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func AwardHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.Awards](w, r)
		if err != nil {
			return
		}

		result, err := service.CreateNewAward(item)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Award created successfully")
		return
	case http.MethodDelete:
		id := r.URL.Query().Get("id")
		if id == "" {
			pkg.SendERR(w, nil, "id is required")
			return
		}

		result, err := service.RemoveAwardItem(id)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Award removed successfully")
		return
	// case http.MethodGet:
	// user := r.URL.Query().Get("user")
	// if user == "" {
	// 	pkg.SendERR(w, nil, "user is required")
	// 	return
	// }

	// result, err := service.GetAllAwardsByUser(user)
	// if err != nil {
	// 	pkg.SendERR(w, nil, err.Error())
	// 	return
	// }
	// pkg.SendOK(w, result, "Awards fetched successfully")
	// return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.User](w, r)
		if err != nil {
			return
		}

		// Trim and check both username and password
		item.Username = strings.TrimSpace(item.Username)
		item.Password = strings.TrimSpace(item.Password)

		if item.Username == "" || item.Password == "" {
			pkg.SendERR(w, nil, "username and password are required")
			return
		}

		result, err := service.CreateNewUser(item)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "User created successfully")
		return
	// case http.MethodDelete:
	// 	id := r.URL.Query().Get("id")
	// 	if id == "" {
	// 		pkg.SendERR(w, nil, "id is required")
	// 		return
	// 	}
	// 	result, err := service.RemoveUserItem(id)
	// 	if err != nil {
	// 		pkg.SendERR(w, nil, err.Error())
	// 		return
	// 	}
	// 	pkg.SendOK(w, result, "User removed successfully")
	// 	return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func SettingsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		user := r.URL.Query().Get("user")
		user = strings.TrimSpace(user)
		if user == "" {
			pkg.SendERR(w, nil, "username is required")
			return
		}
		result, err := service.GetUserSettings(user)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Settings fetched successfully")
		return
	case http.MethodPut:
		user := r.URL.Query().Get("user")
		user = strings.TrimSpace(user)
		if user == "" {
			pkg.SendERR(w, nil, "username is required")
			return
		}

		item, err := pkg.BodyParser[models.Settings](w, r)
		if err != nil {
			return
		}
		result, err := service.UpdateUserSettings(user, item)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}
		pkg.SendOK(w, result, "Settings updated successfully")
		return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.UserDTO](w, r)

		if err != nil {
			return
		}

		username := strings.TrimSpace(item.Username)
		password := strings.TrimSpace(item.Password)

		if username == "" || password == "" {
			pkg.SendERR(w, nil, "username and password are required")
			return
		}

		result, err := service.Login(username, password)
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}

		pkg.SendOK(w, result, "Login successful")
		return
	default:
		pkg.SendERR(w, nil, "method not allowed")
		return
	}
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		item, err := pkg.BodyParser[models.UserDTO](w, r)

		if err != nil {
			return
		}

		username := strings.TrimSpace(item.Username)
		password := strings.TrimSpace(item.Password)

		if username == "" || password == "" {
			pkg.SendERR(w, nil, "username and password are required")
			return
		}

		result, err := service.CreateNewUser(models.User{
			Username: username,
			Password: password,
		})
		if err != nil {
			pkg.SendERR(w, nil, err.Error())
			return
		}

		pkg.SendOK(w, result, "Signup successful")
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
	http.HandleFunc("/api/v0/stock", StockHandler)

	// AWARD
	http.HandleFunc("/api/v0/award", AwardHandler)

	// USER
	http.HandleFunc("/api/v0/user", UserHandler)

	// SETTINGS
	http.HandleFunc("/api/v0/settings", SettingsHandler)

	// Login
	http.HandleFunc("/api/v0/login", LoginHandler)

	// Signup
	http.HandleFunc("/api/v0/signup", SignupHandler)

	log.Printf("listening on localhost%s", listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))
}
