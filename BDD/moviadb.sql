-- Create the database
CREATE DATABASE MovieDatabase;
USE MovieDatabase;

-- Create the Movies table
CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    overview TEXT,
    title VARCHAR(255),
    poster_path VARCHAR(255),
    release_date DATE,
    budget FLOAT,
    revenue FLOAT,
    runtime FLOAT,
    vote_average FLOAT,
    vote_count INT,
    tagline VARCHAR(255),
    embeddings LONGBLOB
);

-- Create the Castings table
CREATE TABLE Castings (
    cast_id INT AUTO_INCREMENT PRIMARY KEY,
    actor_name VARCHAR(255),
    character_name VARCHAR(255),
    movie_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

-- Create the Crews table
CREATE TABLE Crews (
    crew_id INT AUTO_INCREMENT PRIMARY KEY,
    person_name VARCHAR(255),
    role VARCHAR(255),
    movie_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

-- Create the Genres table
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Create the MovieGenres table
CREATE TABLE MovieGenres (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

-- Create the MoviesMovies table
CREATE TABLE MoviesMovies (
    movie_id INT,
    movie_id_1 INT,
    similarity_score FLOAT,
    PRIMARY KEY (movie_id, movie_id_1),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (movie_id_1) REFERENCES Movies(movie_id)
);

-- Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    birthday DATE,
    sexe VARCHAR(10),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

-- Create the MovieUsers table
CREATE TABLE MovieUsers (
    movie_id INT,
    user_id INT,
    note INT,
    PRIMARY KEY (movie_id, user_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create the UserGenre table
CREATE TABLE UserGenre (
    genre_id INT,
    user_id INT,
    PRIMARY KEY (genre_id, user_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Grant all privileges on the MovieDatabase to the user
GRANT ALL PRIVILEGES ON MovieDatabase.* TO 'moviemania'@'%';

-- Apply the changes
FLUSH PRIVILEGES;
