import pandas as pd
import mysql.connector

# load the csv I downloaded from kaggle
usecols = ['bookID', 'title', 'authors', 'language_code', 'average_rating', 'num_pages', 'ratings_count', 'text_reviews_count', 'publication_date']
df = pd.read_csv(r"C:\Users\kelle\Downloads\books.csv", on_bad_lines='skip')
print(df)

# connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="test"
)

cursor = db.cursor()

def fix_date(date):
    m, d, y = date.split("/")
    fixed_date = y + "-" + m + "-" + d
    return fixed_date

# insert each row into Books table
for index, row in df.iterrows():
    try:
        cursor.execute(
            "INSERT INTO Books (bookID, title, authors, language_code, average_rating, num_pages, ratings_count, text_reviews_count, publication_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (row['bookID'], row['title'], row['authors'], row['language_code'], row['average_rating'], row['  num_pages'], row['ratings_count'], row['text_reviews_count'], fix_date(row['publication_date']))
        )
    except Exception as e:
        print(f"Error on row {index}: {e}")

# Commit changes and close
db.commit()
cursor.close()
db.close()

print("data inserted yay!")