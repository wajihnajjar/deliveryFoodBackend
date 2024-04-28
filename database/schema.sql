DROP DATABASE IF EXISTS delivery;

CREATE DATABASE delivery;

USE delivery;

CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  firstName varchar(255),
  lastName varchar(255),
  email varchar(255) UNIQUE,
  password varchar(255),
  phoneNumber int,
  points int default 0 ,
  PRIMARY KEY (id)
);

CREATE TABLE restaurant (
  restaurant_id int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  password varchar(64),
  picture varchar(255),
  description varchar(255),
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE menu (
  id_menu int NOT NULL AUTO_INCREMENT,
  food_name varchar(50),
  price int,
  image_food varchar(255) NOT NULL,
  Descr varchar(255),
  food_type varchar(255),
  click int default 0, 
  PRIMARY KEY (id_menu)
);

CREATE TABLE orders(
id int NOT NULL AUTO_INCREMENT,
id_user int  not null ,
orderstring varchar(200), 
comment varchar(250) ,
PRIMARY KEY(id) , 
 CONSTRAINT Tt FOREIGN key (id_user) REFERENCES user(id)  
);

  CREATE TABLE reviews (
    id_feedback int NOT NULL AUTO_INCREMENT,
    email varchar(40),
    feedback varchar(255),
    Rate int DEFAULT 0  , 
    PRIMARY KEY (id_feedback));



INSERT INTO menu (food_name, price , image_food,Descr,food_type) VALUES 
("Burger",5,"https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107641/g-1_diylwd.jpg","Tasty Burger it contains sheep meet ","first"),
("Chiken Fried" , 6 , "https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107643/g-6_qbpryn.jpg" , "Chicken" , "first"),
("Chocolate Cake" , 7 ,"https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107643/g-8_ttn33c.jpg","Sweet chocolate" ,"second"),
("Cup Cake",2 , "https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107642/g-4_qorovh.jpg","Cup Cake" , "second"),
("Juice",2 , "https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107685/p-5_vb90yl.jpg","Juice","third") , 
("Ice-Cream",4,"https://res.cloudinary.com/dn6kxvylo/image/upload/v1712107685/p-6_aa35k2.jpg","Ice cream" , "third") ; 



