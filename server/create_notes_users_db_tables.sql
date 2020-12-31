CREATE DATABASE notes_users_db;
USE notes_users_db;
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_first_name VARCHAR(20) NOT NULL,
    user_last_name VARCHAR(20) NOT NULL,
    user_username VARCHAR(20) NOT NULL UNIQUE,
    user_password VARCHAR(20) NOT NULL
);
CREATE TABLE notes (
	note_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    note_title VARCHAR(20) NOT NULL UNIQUE,
    note_body VARCHAR(150) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM notes;