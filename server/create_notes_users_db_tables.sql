CREATE DATABASE notes_users_db;
USE notes_users_db;
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_first_name VARCHAR(20) NOT NULL,
    user_last_name VARCHAR(20) NOT NULL,
    user_username VARCHAR(20) NOT NULL UNIQUE,
    user_password VARCHAR(20) NOT NULL
);
SELECT * FROM users;