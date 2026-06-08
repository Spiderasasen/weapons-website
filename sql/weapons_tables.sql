-- drops any table
drop table if exists Weapon_Years;
drop table if exists Main_Weapons;
drop table if exists Weapon_Characteristics;
drop table if exists Countries;
drop table if exists Ammo;
drop table if exists Links;

-- creates the tables
-- many to one (ex. many countries made a gun, but they made that model once)
create table Countries(
	country_id serial primary key,
	country_name varchar(100) not null
);

create table Weapon_Characteristics(
	char_id serial primary key,
	weapon_type varchar(50),
	weapon_subtype varchar(50),
	weapon_service varchar(100),
	weapon_status varchar(100)
);

create table Ammo(
	ammo_id serial primary key,
	ammo_type varchar(100)
);

-- main
create table Main_Weapons(
	weapon_id SERIAL primary key,
	name varchar(100) not null,
	description text,
	-- calling all the other tables
	country_id int,
	char_id int,
	ammo_id int,
	foreign key (country_id) references Countries(country_id),
	foreign key (char_id) references Weapon_Characteristics(char_id),
	foreign key (ammo_id) references Ammo(ammo_id)
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
