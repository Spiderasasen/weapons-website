-- drops any table
drop table if exists Weapon_Years;
drop table if exists Links;
drop table if exists Main_Weapons;
drop table if exists Countries;
drop table if exists Ammo;

-- creates the tables
-- many to one (ex. many countries made a gun, but they made that model once)
create table Countries(
	country_id serial primary key,
	country_name varchar(100) not null
);

create table Ammo(
	ammo_id serial primary key,
	ammo_type varchar(100)
);

-- main
CREATE TABLE Main_Weapons(
    weapon_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    weapon_type VARCHAR(50),
    weapon_subtype VARCHAR(50),
    weapon_service VARCHAR(100),
    weapon_status VARCHAR(100),
    country_id INT,
    ammo_id INT,
    FOREIGN KEY (country_id) REFERENCES Countries(country_id),
    FOREIGN KEY (ammo_id) REFERENCES Ammo(ammo_id)
);


-- one to one relationship
create table Weapon_Years(
	year_id serial primary key,
	weapon_id int not null,
	year_of_creation varchar(50),
	years_of_service varchar(100),
	foreign key (weapon_id) references Main_Weapons(weapon_id)
);

create table Links(
	link_id serial primary key,
	weapon_id int not null,
	image_link text,
	soruce_link text,
	foreign key (weapon_id) references Main_Weapons(weapon_id)
);

-- selecting all info
select * from ammo a;
select * from countries c;
select * from links l;
select * from main_weapons mw;
select * from weapon_characteristics wc;
select * from weapon_years wy;
