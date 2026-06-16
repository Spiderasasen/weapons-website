package main

import (
	"bufio"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

// connecting to the database
func connection() *sql.DB {
	file, err := os.Open("credentals.txt")

	//if there is an error, it will yell at me
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	//reads the file and places all the info inside an array called 'lines'
	lines := []string{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	//where the credentals will be located
	host := lines[0]
	user := lines[1]
	password := lines[2]
	dbname := lines[3]
	port := lines[4]

	//connting to the database
	connSr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", host, user, password, dbname, port)

	//checking if there are any errors in connecting to the database
	db, err := sql.Open("postgres", connSr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Successfully connected to database")
	return db
}

func getWeapons(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "weapons endpoint coming soon!")
}

func main() {
	//connecting to the database
	db = connection()
	defer db.Close()

	//route
	http.HandleFunc("/weapons", getWeapons)
	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
