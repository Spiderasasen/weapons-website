package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// the struct for new data, aka new weapons
type NewWeapon struct {
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

func addWeapon(w http.ResponseWriter, r *http.Request) {
	//decoding the info from the frontend to be json
	var newWeapon NewWeapon
	err := json.NewDecoder(r.Body).Decode(&newWeapon)
	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	//handels the countries table
	var CountryID int
	err = db.QueryRow(`
		select country_id from Countries where country_name = $1;
	`, newWeapon.Country).Scan(&CountryID)
	if err != nil {
		err = db.QueryRow(`
			insert into Countries (country_name) values ($1) returning country_id;
		`, newWeapon.Country).Scan(&CountryID)
		if err != nil {
			log.Println("Country insert error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
	}
}
