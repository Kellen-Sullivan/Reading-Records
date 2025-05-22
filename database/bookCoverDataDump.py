import pandas as pd
import mysql.connector

# load the csv I downloaded from kaggle
usecols = ['image', 'isbn']
df = pd.read_csv(r"C:\Users\kelle\Downloads\main_dataset.csv", on_bad_lines='skip')
print(df.columns)

# connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="test"
)

cursor = db.cursor()

# insert each row into Books table
for index, row in df.iterrows():
    try:
        cursor.execute(
            "INSERT INTO BookCovers (image, isbn13) VALUES (%s, %s)",
            (row['image'], row['isbn'])
        )
    except Exception as e:
        print(f"Error on row {index}: {e}")

# Commit changes and close
db.commit()
cursor.close()
db.close()

print("data inserted yay!")