CREATE DATABASE bAmazon;
USE bAmazon;

CREATE TABLE items (
    id INTEGER(12) AUTO_INCREMENT NOT NULL,
    ItemName VARCHAR(50) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL (10,2) NOT NULL,
    Stock INTEGER (10),
    PRIMARY KEY (id)
);

INSERT INTO items (ItemName, DepartmentName, Price, Stock)
VALUES ("Crappy Old TVs", "Electronics", 49.99, 5), ("World's Best Chocolate Chip Cookies", "Food", 4.99, 250), 
("Fake Name Brand Designer Handbags", "Fashion", "1500", '20'), ("Jeans", "Fashion", 29.99, 50), ("Water Bottles", "Outdoors", 9.99, 100);

SELECT * FROM items