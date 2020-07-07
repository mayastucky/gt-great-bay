DROP DATABASE IF EXISTS great_bayDB;

CREATE DATABASE great_bayDB;

USE great_bayDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(45) NULL,
  itemType varchar(30) NOT NULL,
  startingBid DECIMAL(10,2) NOT NULL,
  );




