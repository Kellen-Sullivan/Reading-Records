DROP TABLE IF EXISTS Books;

CREATE TABLE Books(
    bookID int AUTO_INCREMENT UNIQUE NOT NULL,
    title varchar(50) NOT NULL,
    author varchar(50) NOT NULL,
    words int NOT NULL,
    PRIMARY KEY (bookID)
)

INSERT INTO Books (title, author, words) 
VALUES
("1984", "George Orwell", 7),
("The Hobbit", "JK Rowling", 1000);