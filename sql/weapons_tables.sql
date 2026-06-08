-- drops any table
drop table if exists Main_Weapons;
drop table if exists Weapon_Characteristics;
drop table if exists Weapon_Years;

-- creates the tables
create table Main_Weapons(
	weapon_id SERIAL primary key,
	name varchar(100) not null,
	description text
);

create table Weapon_Characteristics(
	char_id serial primary key,
	weapon_id int not null,
	weapon_type varchar(50),
	weapon_subtype varchar(50),
	weapon_service varchar(100),
	foreign key (weapon_id) references Main_Weapons(weapon_id)
);

create table Weapon_Years(
	year_id serial primary key,
	weapon_id int not null,
	year_of_creation varchar(50),
	years_of_service varchar(100),
	foreign key (weapon_id) references Main_Weapons(weapon_id)
);
