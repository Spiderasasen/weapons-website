-- drops any table
drop table Main_Weapons;

-- creates the tables
create table Main_Weapons(
	weapon_id SERIAL primary key,
	name varchar(100) not null,
	description text
);

