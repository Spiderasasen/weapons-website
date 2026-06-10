import psycopg2 #if you see a red line, FUCKING IGNORE IT!!! It works on linux.

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

def main():
    con = connect()
    cur = con.cursor()
    print(con)
    cur.close()
    con.close()

if __name__ == '__main__':
    main()