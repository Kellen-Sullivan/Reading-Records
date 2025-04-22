DROP TABLE IF EXISTS UserBooks, Users, Books;

CREATE TABLE Books(
    bookID int AUTO_INCREMENT UNIQUE NOT NULL,
    title varchar(256),
    authors varchar(256),
    average_rating decimal(3,2),
    language_code varchar(50),
    num_pages int,
    ratings_count int,
    text_reviews_count int,
    publication_date DATE,
    PRIMARY KEY (bookID)
);

CREATE TABLE Users(
    userID int AUTO_INCREMENT UNIQUE NOT NULL,
    fName varchar(50),
    lName varchar(50),
    PRIMARY KEY (userID)
);

-- Junction table to link users to books they have read
CREATE TABLE UserBooks (
    userID int NOT NULL,
    bookID int NOT NULL,
    pages_read int DEFAULT 0,
    is_complete TINYINT(1) DEFAULT 0,
    PRIMARY KEY (userID, bookID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE
);

INSERT INTO Users (fName, lName) VALUES ("Kellen", "Sullivan");

INSERT INTO UserBooks (userID, bookID) VALUES (1, 1);
