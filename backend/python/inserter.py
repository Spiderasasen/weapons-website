import psycopg2 #if you see a red line, FUCKING IGNORE IT!!! It works on linux.
import csv #importing the csv file now

#establishes the connection
def connect():
    with open("credentals.txt", "r") as f:
        lines = f.read().splitlines()
        host = lines[0]
        user = lines[1]
        password = lines[2]
        database = lines[3]
        port = lines[4]

    return psycopg2.connect(
        host = host,
        user = user,
        password = password,
        database = database,
        port = port
    )

"""
GOAL:
We need to make it possible where all my many to one tables dont have repeating names.

IDEA:
we can do a simple if statment that checks first if the name is there of the item.
if so ignore it, else add it

MORE COMPLEX BUT NEEDED:
instead of type "is ____ in table ____" 9 million times,
we instead make a global searcher (meaning we might also make a global inserter)
"""
def exist_in_table(cur, table, column, value):
    cur.execute(f"select * from {table} where {column}=%s", (value,))
    return cur.fetchone()

def insert_or_not(cur, table, id_column, column, value):
    result = exist_in_table(cur, table, column, value)
    if result:
        return result[0]
    else:
        cur.execute(f"insert into {table} ({column}) values (%s) returning {id_column}", (value,))
        return cur.fetchone()[0]

#inserting into the main code
def insert_main_weapon(cur, row, country_id, ammo_id):
    cur.execute("""
        INSERT INTO Main_Weapons(
            name,
            description,
            weapon_type,
            weapon_subtype,
            weapon_service,
            weapon_status,
            country_id,
            ammo_id
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING weapon_id
    """, (
        row["Name"],
        row["Discription"],
        row["Weapon Type"],
        row["Wepon subtype"],
        row["Weapon Service"],
        row["Legal Status"],
        country_id,
        ammo_id
    ))
    return cur.fetchone()[0]


"""inserting into the one to one table"""
#inserting into links
def one_to_link(cur, row, weapon_id):
    cur.execute("""
        insert into Links(
            weapon_id,
            image_link,
            soruce_link
        ) values (%s, %s, %s)
    """, (
        weapon_id,
        row["Image Link"],
        row["Sources"]
    ))

#inserting the years of service
def one_to_year(cur, row, weapon_id):
    cur.execute("""
        insert into Weapon_Years(
            weapon_id,
            year_of_creation,
            years_of_service
        ) values (%s, %s, %s)
    """, (
        weapon_id,
        row["Year of Creation"],
        row["Years of Service"]
    ))

"""making the main function code in a def
    this code will only be used once
"""
def intro_code(cur):
    with open("Wepons_of_around_the_world-Weapons.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            #many to one first
            country_id = insert_or_not(cur, "Countries", "country_id", "country_name", row["Country"])
            ammo_id = insert_or_not(cur, "Ammo", "ammo_id", "ammo_type", row["Ammo Type"])

            #main table
            weapon_id = insert_main_weapon(cur, row, country_id, ammo_id)

            #one to one tables
            one_to_link(cur, row, weapon_id) #links
            one_to_year(cur, row, weapon_id) #years

            #checking if the item was scucessfully inserted into the database
            print(f"inserted {row["Name"]} successfully")

#main code
def main():
    #conecting to the data base
    con = connect()
    cur = con.cursor()

    #main functions
    intro_code(cur)

    #closing the system
    con.commit()
    cur.close()
    con.close()

if __name__ == '__main__':
    main()