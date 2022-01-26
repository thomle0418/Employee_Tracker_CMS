DROP DATABASE IF EXISTS  employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    name_ VARCHAR (30),
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN key (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;
