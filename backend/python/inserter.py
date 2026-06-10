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

#main code
def main():
    con = connect()
    cur = con.cursor()
    print(con)
    cur.close()
    con.close()

if __name__ == '__main__':
    main()