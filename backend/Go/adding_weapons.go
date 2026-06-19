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

	//handeling the ammo
	var AmmoID int
	err = db.QueryRow(`
		select ammo_id from Ammo where ammo_type - $1;
	`, newWeapon.AmmoType).Scan(&AmmoID)
	if err != nil {
		err = db.QueryRow(`
			insert into Ammo (ammo_id) values ($1) returning ammo_id;
		`, newWeapon.AmmoType).Scan(&AmmoID)
		if err != nil {
			log.Println("Ammo insert error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
	}

	//inserting into the main table
	var weaponID int
	err = db.QueryRow(`
		inerst into Main_Weapons (
		       name,
		       description,
		       weapon_type,
		       weapon_subtype,
		       weapon_service,
		       weapon_status,
		       country_id,
		       ammo_id
		) values ($1, $2, $3, $4, $5, $6, $7, $8)
		returning weapon_id;
	`, newWeapon.Name, newWeapon.Description, newWeapon.WeaponType,
		newWeapon.WeaponSubtype, newWeapon.WeaponService, newWeapon.WeaponStatus,
		CountryID, AmmoID).Scan(&weaponID)
	if err != nil {
		log.Println("Main table error:", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	//inserting into the weapon years
	_, err = db.Exec(`
		insert into Weapon_Years(weapon_id, year_of_creation, years_of_service)
		values ($1, $2, $3);
	`, weaponID, newWeapon.YearCreated, newWeapon.YearsService)
	if err != nil {
		log.Println("Years table error:", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	//inserting into the links table
	_, err = db.Exec(`
		insert into Links(weapon_id, image_link, soruce_link)
		values ($1, $2, $3);
	`, weaponID, newWeapon.ImageLink, newWeapon.SourceLink)
	if err != nil {
		log.Println("Links table error:", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	//if everything went down secussful we send this
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Weapon added successfully!",
	})
}
