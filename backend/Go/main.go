package main

import (
	"bufio"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

// making the weapons structure
type Weapon struct {
	WeaponID      int    `json:"weapon_id"`
	Name          string `json:"name"`
	Description   string `json:"description"`
	WeaponType    string `json:"weapon_type"`
	WeaponSubtype string `json:"weapon_subtype"`
	WeaponService string `json:"weapon_service"`
	WeaponStatus  string `json:"weapon_status"`
	Country       string `json:"country"`
	AmmoType      string `json:"ammo_type"`
	YearCreated   string `json:"year_of_creation"`
	YearsService  string `json:"years_of_service"`
	ImageLink     string `json:"image_link"`
	SourceLink    string `json:"source_link"`
}

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
	connSr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, port)

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
	//bascally praying that i didnt mispell anything
	rows, err := db.Query(`
        SELECT
            mw.weapon_id,
            mw.name,
            mw.description,
            mw.weapon_type,
            mw.weapon_subtype,
            mw.weapon_service,
            mw.weapon_status,
            c.country_name,
            a.ammo_type,
            wy.year_of_creation,
            wy.years_of_service,
            l.image_link,
            l.soruce_link
        FROM Main_Weapons mw
        LEFT JOIN Countries c ON mw.country_id = c.country_id
        LEFT JOIN Ammo a ON mw.ammo_id = a.ammo_id
        LEFT JOIN Weapon_Years wy ON mw.weapon_id = wy.weapon_id
        LEFT JOIN Links l ON mw.weapon_id = l.weapon_id
    `)
	//if i missed spell something, it will yell at me
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	weapons := []Weapon{}

	//inserting all the info into the type struct
	for rows.Next() {
		var w Weapon
		err := rows.Scan(
			&w.WeaponID,
			&w.Name,
			&w.Description,
			&w.WeaponType,
			&w.WeaponSubtype,
			&w.WeaponService,
			&w.WeaponStatus,
			&w.Country,
			&w.AmmoType,
			&w.YearCreated,
			&w.YearsService,
			&w.ImageLink,
			&w.SourceLink,
		)
		if err != nil {
			log.Println("Scan Error:", err)
		}
		weapons = append(weapons, w)
	}

	//converts to json
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(weapons)

}

// saftey clearance for react
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		next(w, r)
	}
}

func main() {
	//connecting to the database
	db = connection()
	defer db.Close()

	//route
	http.HandleFunc("/weapons", corsMiddleware(getWeapons))
	http.HandleFunc("/addedWeapons", corsMiddleware(getWeapons))
	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
