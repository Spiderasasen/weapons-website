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

def insert_or_not(cur, table, column, value):
    result = exist_in_table(cur, table, column, value)
    if result:
        return result[0]
    else:
        cur.execute(f"insert into {table} ({column}) values (%s) returning id", (value,))
        return cur.fetchone()[0]


#inserting into the main code
def insert_main_wepaon(cur, row, country_id, ammo_id):
    cur.execute("""
        insert into Main_Weapons(
            name,
            description,
            weapon_type,
            weapon_subtype,
            weapon_service,
            weapon_status,
            country_id,
            ammo_id
        ) VALUES (%s, %s, %s, %s, %s, %s, %s)
    """),(
        row["Name"],
        row["Discription"],
        row["Weapon Type"],
        row["Wepon subtype"],
        row["Weapon Service"],
        country_id,
        ammo_id
    )
    return cur.fetchone()[0]


"""inserting into the one to one table"""
#inserting into links

#main code
def main():
    #conecting to the data base
    con = connect()
    cur = con.cursor()

    #main functions
    print(con)

    #closing the system
    cur.close()
    con.close()

if __name__ == '__main__':
    main()