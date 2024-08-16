-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : lun. 15 juil. 2024 à 17:20
-- Version du serveur : 11.4.2-MariaDB-ubu2404
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `MovieDatabase`
--

-- --------------------------------------------------------

--
-- Structure de la table `Castings`
--

CREATE TABLE `Casting` (
  `cast_id` int(11) NOT NULL,
  `actor_name` varchar(255) DEFAULT NULL,
  `character_name` varchar(255) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `Castings`
--

INSERT INTO `Casting` (`cast_id`, `actor_name`, `character_name`, `movie_id`) VALUES
(1, 'Natalie Bush', 'Megan Torres', 1),
(2, 'Paul Morris', 'Thomas Smith', 1),
(3, 'Diane Garner', 'Morgan Chavez', 1),
(4, 'Beth Walker MD', 'Jesus Brown', 2),
(5, 'Maria Harmon', 'Connor Carr', 2),
(6, 'Mr. Aaron Chandler', 'Nancy Graham', 2),
(7, 'Michael Moore', 'William Blake', 3),
(8, 'Shawn Rodriguez', 'Lisa Cooper', 3),
(9, 'Sabrina Peterson', 'Derrick Kelley', 3),
(10, 'Patricia Howard', 'David Powers', 4),
(11, 'Jeffrey Lam', 'Paul Velasquez', 4),
(12, 'Derek Weaver', 'Leon Ryan', 4),
(13, 'Jennifer Lopez', 'Kathleen Scott', 5),
(14, 'Destiny Hill', 'Dr. Jonathan Zimmerman', 5),
(15, 'Kendra Diaz', 'Charles Crosby', 5),
(16, 'Barbara Jenkins', 'Jeffrey Stevenson', 6),
(17, 'Alfred Mccullough', 'Dr. Sandra Rogers MD', 6),
(18, 'Jim Miller', 'Misty Rodriguez', 6),
(19, 'Kaitlyn Johnson', 'Kyle Vega', 7),
(20, 'Nicholas Lynn', 'Kent Arnold', 7),
(21, 'Scott Coffey', 'Emily Gillespie', 7),
(22, 'Debra Turner', 'Lisa Johnson', 8),
(23, 'Mark Griffin', 'Cassie Gardner', 8),
(24, 'Stephanie Kim', 'Justin Davila', 8),
(25, 'Jennifer Spencer', 'Donna Payne', 9),
(26, 'Monica Douglas', 'Robert Willis', 9),
(27, 'Michelle Riley', 'Clayton Harrell', 9),
(28, 'Karla Anderson', 'Kevin Camacho', 10),
(29, 'Brandon Owens', 'Cynthia Brown', 10),
(30, 'Keith West', 'Joshua Ramirez', 10),
(31, 'Kendra Hansen', 'Anthony Cole', 11),
(32, 'Michele King', 'Jeremy Delacruz', 11),
(33, 'Michelle Wood', 'Zachary Miller', 11),
(34, 'Sheila Barber', 'Tyrone Ellison', 12),
(35, 'Michael Kim', 'Judy Solomon', 12),
(36, 'Louis Adams', 'Peter Meadows', 12),
(37, 'Sarah Norris', 'Sarah Gordon', 13),
(38, 'Jane Cross', 'Jaime Lewis', 13),
(39, 'Emma Hooper', 'Alexander Gomez', 13),
(40, 'Zachary Miller', 'Kathy Roth', 14),
(41, 'Terri Christian', 'Vanessa Chapman', 14),
(42, 'Ryan Grant', 'Sabrina Bright', 14),
(43, 'Tiffany Long', 'Evelyn Browning', 15),
(44, 'Danielle Carr', 'Robert Donovan', 15),
(45, 'Jordan White', 'Eric Kirk', 15),
(46, 'Kenneth Hanson', 'Howard Haynes', 16),
(47, 'Kimberly Cooley', 'Ruben Love', 16),
(48, 'Rachel Santos', 'Benjamin Miller', 16),
(49, 'Maria Smith', 'Jimmy Bailey', 17),
(50, 'Danielle Good', 'Brianna Conley', 17),
(51, 'Albert Mckinney', 'Christine Rivas', 17),
(52, 'Jonathan Pruitt', 'Robert Leon', 18),
(53, 'Cassandra Pierce', 'Andrew Maldonado DVM', 18),
(54, 'Matthew Lewis', 'Jennifer Taylor', 18),
(55, 'Kevin Maxwell', 'Kimberly Hicks', 19),
(56, 'Jason Chavez', 'Sean Guzman', 19),
(57, 'Karen James', 'Christopher Hill', 19),
(58, 'Jennifer Reeves', 'Dr. Kenneth Williams', 20),
(59, 'Christopher Morgan', 'Gary Hanson', 20),
(60, 'Tyler Soto', 'Logan Mejia', 20);

-- --------------------------------------------------------

--
-- Structure de la table `Crews`
--

CREATE TABLE `Crew` (
  `crew_id` int(11) NOT NULL,
  `person_name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `Crews`
--

INSERT INTO `Crew` (`crew_id`, `person_name`, `role`, `movie_id`) VALUES
(1, 'Nathaniel Woods', 'Recruitment consultant', 1),
(2, 'Tamara Hess', 'Jewellery designer', 1),
(3, 'Thomas Clark', 'Mechanical engineer', 1),
(4, 'David Davies', 'Scientist, research (physical sciences)', 2),
(5, 'Michael Mitchell', 'Accountant, chartered certified', 2),
(6, 'Frank Robertson', 'Medical sales representative', 2),
(7, 'Angelica Barr', 'IT trainer', 3),
(8, 'Katherine Long', 'Historic buildings inspector/conservation officer', 3),
(9, 'Brian Zamora', 'Hospital doctor', 3),
(10, 'Terri Manning', 'Teacher, special educational needs', 4),
(11, 'Patricia Willis', 'Materials engineer', 4),
(12, 'Lisa Wilson', 'Physiological scientist', 4),
(13, 'Norma Reilly', 'Therapist, music', 5),
(14, 'Jeffery Delacruz', 'Orthoptist', 5),
(15, 'Laura Wu', 'Production designer, theatre/television/film', 5),
(16, 'Alisha Fowler', 'Waste management officer', 6),
(17, 'Donald Hill', 'Engineer, site', 6),
(18, 'Michael Green', 'Site engineer', 6),
(19, 'Brittney Gonzales', 'Clinical cytogeneticist', 7),
(20, 'Roberta Smith', 'Advertising art director', 7),
(21, 'Robert Cuevas', 'Audiological scientist', 7),
(22, 'Shelia Lewis', 'Television camera operator', 8),
(23, 'Cory Hunter', 'Financial planner', 8),
(24, 'Alfred Young', 'Make', 8),
(25, 'Marcus Johnson', 'Legal executive', 9),
(26, 'Isaac Gomez', 'Engineer, civil (contracting)', 9),
(27, 'Kevin Braun', 'Medical illustrator', 9),
(28, 'Deborah Rodriguez', 'Teacher, early years/pre', 10),
(29, 'Thomas Garcia', 'Health and safety inspector', 10),
(30, 'Cynthia Gonzalez', 'Barrister', 10),
(31, 'Christian Ramos', 'Engineer, mining', 11),
(32, 'Brian Cannon', 'Administrator, Civil Service', 11),
(33, 'Christina Steele', 'Energy engineer', 11),
(34, 'Justin Rose', 'Electrical engineer', 12),
(35, 'James Mitchell', 'Chief of Staff', 12),
(36, 'Michael Herrera', 'Fine artist', 12),
(37, 'Kristina Chase', 'Computer games developer', 13),
(38, 'Sabrina Carter', 'Conservator, furniture', 13),
(39, 'Christina Brown', 'Pilot, airline', 13),
(40, 'Jesse Smith', 'Solicitor', 14),
(41, 'Sarah Skinner', 'Architect', 14),
(42, 'Harry Smith', 'Clinical scientist, histocompatibility and immunogenetics', 14),
(43, 'Kaitlyn Stanley MD', 'IT trainer', 15),
(44, 'Lori Buchanan', 'Publishing rights manager', 15),
(45, 'Anthony Woods', 'Research scientist (life sciences)', 15),
(46, 'Brenda Lewis', 'Midwife', 16),
(47, 'Catherine Leach', 'Computer games developer', 16),
(48, 'Anthony Hatfield', 'Sales promotion account executive', 16),
(49, 'Caitlin Lewis', 'Systems analyst', 17),
(50, 'Shawn Clark', 'Colour technologist', 17),
(51, 'Adrian Carter', 'Video editor', 17),
(52, 'Betty Thompson', 'Water quality scientist', 18),
(53, 'William Daniel', 'Paramedic', 18),
(54, 'Danny Weber', 'Telecommunications researcher', 18),
(55, 'Lisa Jones', 'Sales executive', 19),
(56, 'Allison Matthews', 'Product/process development scientist', 19),
(57, 'Heather Grimes', 'Risk manager', 19),
(58, 'Jill Howard', 'Ambulance person', 20),
(59, 'David Mcclure', 'Commercial horticulturist', 20),
(60, 'Scott Cook', 'Best boy', 20);

-- --------------------------------------------------------

--
-- Structure de la table `Genres`
--

CREATE TABLE `Genre` (
  `genre_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `Genres`
--

INSERT INTO `Genre` (`genre_id`, `name`) VALUES
(1, 'ever'),
(2, 'recent'),
(3, 'attention'),
(4, 'similar'),
(5, 'by'),
(6, 'physical'),
(7, 'glass'),
(8, 'couple'),
(9, 'always'),
(10, 'better');

-- --------------------------------------------------------

--
-- Structure de la table `MovieGenres`
--

CREATE TABLE `MovieGenre` (
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `MovieGenres`
--

INSERT INTO `MovieGenre` (`movie_id`, `genre_id`) VALUES
(3, 1),
(9, 1),
(3, 2),
(4, 2),
(7, 2),
(10, 2),
(5, 3),
(6, 3),
(8, 3),
(10, 3),
(2, 4),
(4, 4),
(7, 4),
(9, 4),
(10, 4),
(1, 5),
(4, 5),
(6, 5),
(18, 6),
(19, 6),
(20, 6),
(12, 7),
(13, 7),
(14, 7),
(15, 7),
(16, 7),
(19, 7),
(11, 8),
(13, 8),
(14, 8),
(17, 8),
(12, 9),
(13, 9),
(16, 9),
(15, 10),
(16, 10),
(17, 10),
(18, 10),
(19, 10);

-- --------------------------------------------------------

--
-- Structure de la table `Movies`
--

CREATE TABLE `Movie` (
  `movie_id` int(11) NOT NULL,
  `overview` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `budget` float DEFAULT NULL,
  `revenue` float DEFAULT NULL,
  `runtime` float DEFAULT NULL,
  `vote_average` float DEFAULT NULL,
  `vote_count` int(11) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `embeddings` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `Movies`
--

INSERT INTO `Movie` (`movie_id`, `overview`, `title`, `poster_path`, `release_date`, `budget`, `revenue`, `runtime`, `vote_average`, `vote_count`, `tagline`, `embeddings`) VALUES
(1, 'Color must result television commercial.\nAppear million watch election. Remember cut drive result society social key. Seem respond woman individual already program fund.', 'Often player.', NULL, '1980-05-26', 3705070, 3739650, 81, 3.38321, 835, 'Develop pay movement arm weight.', NULL),
(2, 'Prepare much language education. Show upon such news shake opportunity camera. Could road receive build take need western.', 'Morning Mrs.', NULL, '1986-12-15', 4266250, 9572520, 152, 8.90769, 186, 'Hand figure rest three southern herself.', NULL),
(3, 'College form morning account dinner play consider. Interview current factor back coach decade.', 'Certain detail.', NULL, '1981-11-01', 6652930, 3031010, 166, 3.57779, 224, 'Form more represent center character feel.', NULL),
(4, 'Treat explain include I of wrong although realize. Peace almost imagine by.\nQuite great present task fund land. Build work consider significant issue owner forward party.', 'Reality mind all.', NULL, '1994-07-07', 6902640, 6959370, 84, 5.45613, 386, 'Bed total important.', NULL),
(5, 'People leader explain throw year. Heart subject military unit glass least. Walk sort thought next career.\nWill name others so. Car argue sport area simple. Again letter rise road.', 'Somebody certain director.', NULL, '2013-01-03', 7860500, 5990420, 158, 4.07296, 77, 'Candidate shake blood family body mention.', NULL),
(6, 'Detail position pay make add seat. Nature dinner carry choice blood.', 'Modern later others.', NULL, '1976-05-10', 9576180, 3854720, 116, 6.5261, 578, 'History most rather walk energy gun.', NULL),
(7, 'Those four design past. President pull care. Push white sense including strong baby just.\nKind beyond end where little. Situation any in already quality.', 'White room.', NULL, '1996-05-16', 3563470, 1861160, 92, 1.84411, 218, 'Born son check.', NULL),
(8, 'Two pick detail simple page. Sort thing change out technology loss.\nEnd our inside perform. Statement traditional charge seek morning difficult your.', 'Phone top job.', NULL, '1988-04-24', 1087150, 666723, 147, 9.38795, 339, 'Space free course law.', NULL),
(9, 'Business leave stay report. History other start lose. Hear day million pick.\nFinish your few. Election kind image can me. By ball man writer. Know gun affect ability activity star begin.', 'What begin.', NULL, '1983-01-26', 9777590, 5251500, 170, 4.36291, 81, 'Hot growth according woman.', NULL),
(10, 'Explain appear everybody arrive. Officer painting human him.\nWest red benefit material might. Firm tonight list wide evening clearly mention. Nearly contain manage approach nation product.', 'Various.', NULL, '1971-03-29', 9844890, 805245, 104, 3.50377, 243, 'Ability record bit in language.', NULL),
(11, 'Every face member. Fast address certain quality unit. Mention common market notice picture yard.\nSuggest check red movement company. Chair true hold around.', 'Various wrong.', NULL, '2004-06-04', 5337860, 4298740, 154, 2.89525, 900, 'Admit right region purpose bar series.', NULL),
(12, 'After marriage say use. Grow defense quickly police close whatever candidate have.\nRecord member store heart determine together. Recognize source find those peace play. Purpose health card strategy.', 'Director clear woman.', NULL, '2005-05-16', 6861170, 1166780, 151, 5.95084, 949, 'Report interview song.', NULL),
(13, 'Citizen him quickly others assume what section. Sort myself western cold young. Industry box since plan source.\nSet place nor society pass vote military.\nAir paper reach. Point month recently.', 'Meeting although different.', NULL, '2005-01-13', 2173970, 6859830, 108, 7.84212, 154, 'Per address campaign.', NULL),
(14, 'Player exactly himself I because. Many require us artist not. Base impact produce miss heavy rule.', 'Blue author middle.', NULL, '2003-09-25', 4184860, 8586600, 105, 1.07554, 764, 'Your ball avoid program once.', NULL),
(15, 'Situation time wrong still produce of. While toward range knowledge throw of. Vote reason old standard.\nDown ago fill house medical. Fund for four smile more.', 'Accept finally.', NULL, '2003-09-10', 5958310, 446797, 155, 8.65496, 100, 'Analysis thought Congress service.', NULL),
(16, 'Turn less central second effect. Very similar price laugh company company especially.\nPass network political always commercial. Pick television compare cup security he huge.', 'By travel.', NULL, '1998-05-10', 8710890, 1274330, 127, 7.31324, 285, 'Today eat world water.', NULL),
(17, 'Model drug performance Mr. Large us ball yes suffer enjoy soon.\nList test parent pick north should laugh. Three step whether hard arm. Off tax difference summer.', 'Respond chance environmental.', NULL, '1995-06-05', 6203540, 4694250, 99, 4.63464, 285, 'Stand team do.', NULL),
(18, 'Smile agreement trip score subject no whatever.\nBehavior person before conference source plan board happy. Enough research performance hold magazine chance PM.', 'Fund hear.', NULL, '1984-05-30', 4026960, 153912, 132, 8.54884, 519, 'Little poor quality.', NULL),
(19, 'According knowledge quickly. Simply talk long. Edge affect per either man.\nSix thank market list. Man occur under team population.', 'Those project economic.', NULL, '1978-02-04', 2192140, 9979840, 124, 3.0433, 103, 'Guess evening six heavy.', NULL),
(20, 'Pass main human act since style. None where natural. Political owner event card common.\nGrow do skin long now. Reality culture to want point goal least far.', 'Remember plant shoulder.', NULL, '2010-08-07', 1229880, 898614, 133, 3.25389, 423, 'News eye church.', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `MoviesMovie`
--

CREATE TABLE `MoviesMovie` (
  `movie_id` int(11) NOT NULL,
  `movie_id_1` int(11) NOT NULL,
  `similarity_score` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `MovieUser`
--

CREATE TABLE `MovieUser` (
  `movie_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `MovieUsers`
--

INSERT INTO `MovieUser` (`movie_id`, `user_id`, `note`) VALUES
(1, 1, 5),
(1, 2, 5),
(1, 4, 4),
(2, 2, 3),
(4, 2, 1),
(5, 3, 5),
(6, 2, 5),
(6, 3, 3),
(6, 4, 1),
(7, 2, 3),
(8, 4, 2),
(8, 5, 2),
(9, 4, 1),
(9, 5, 2),
(10, 5, 3),
(11, 8, 2),
(11, 9, 1),
(12, 6, 4),
(12, 10, 4),
(13, 8, 5),
(14, 10, 2),
(15, 9, 3),
(16, 6, 5),
(16, 10, 3),
(18, 7, 5),
(18, 8, 1),
(18, 9, 4),
(19, 6, 2),
(19, 8, 3),
(19, 9, 1),
(20, 6, 1),
(20, 9, 2),
(20, 10, 5);

-- --------------------------------------------------------

--
-- Structure de la table `UserGenre`
--

CREATE TABLE `UserGenre` (
  `genre_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `UserGenre`
--

INSERT INTO `UserGenre` (`genre_id`, `user_id`) VALUES
(2, 1),
(3, 1),
(3, 2),
(3, 3),
(2, 4),
(4, 4),
(1, 5),
(3, 5),
(4, 5),
(6, 6),
(9, 6),
(10, 6),
(7, 7),
(8, 7),
(6, 8),
(7, 8),
(8, 8),
(10, 9),
(9, 10),
(10, 10);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` boolean DEFAULT NULL,
  `is_superuser` boolean DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `User` (`user_id`, `nom`, `prenom`, `birthday`, `sexe`, `password`, `email`, `is_active`, `is_superuser`) VALUES
(1, 'Price', 'Lauren', '2019-05-22', 'F', '$*^0TyPdQ!', 'rodney86@example.com', 1, 0),
(2, 'Castillo', 'Regina', '1986-11-08', 'F', 'z8MWif)%%w', 'karen14@example.com', 1, 0),
(3, 'Solis', 'Matthew', '1981-05-11', 'M', 'rc2OnrTY7)', 'bryancase@example.org', 1, 0),
(4, 'Martinez', 'Heather', '1989-03-29', 'F', 'N1XBRPwm*l', 'michael86@example.net', 1, 0),
(5, 'Phillips', 'Daniel', '2015-09-08', 'F', '_3Iq2PCr^O', 'mjames@example.org', 1, 0),
(6, 'Schwartz', 'Andrea', '1971-02-05', 'F', '_Nl6cawv0J', 'paulwilson@example.com', 1, 0),
(7, 'Howard', 'Mary', '2022-06-19', 'F', '_u1QGWjjc(', 'timothybrooks@example.com', 1, 0),
(8, 'Liu', 'Charles', '2016-09-28', 'M', 'N&Xpo1XMEo', 'andrea33@example.org', 1, 0),
(9, 'James', 'Terry', '2016-01-17', 'M', 'AG!41EZtcX', 'apowell@example.net', 1, 0),
(10, 'Smith', 'Sara', '1986-10-24', 'F', '55ZkQj0T!w', 'singram@example.com', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Castings`
--
ALTER TABLE `Casting`
  ADD PRIMARY KEY (`cast_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Index pour la table `Crews`
--
ALTER TABLE `Crew`
  ADD PRIMARY KEY (`crew_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Index pour la table `Genres`
--
ALTER TABLE `Genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Index pour la table `MovieGenres`
--
ALTER TABLE `MovieGenre`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Index pour la table `Movies`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Index pour la table `MoviesMovies`
--
ALTER TABLE `MoviesMovie`
  ADD PRIMARY KEY (`movie_id`,`movie_id_1`),
  ADD KEY `movie_id_1` (`movie_id_1`);

--
-- Index pour la table `MovieUsers`
--
ALTER TABLE `MovieUser`
  ADD PRIMARY KEY (`movie_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `UserGenre`
--
ALTER TABLE `UserGenre`
  ADD PRIMARY KEY (`genre_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Castings`
--
ALTER TABLE `Casting`
  MODIFY `cast_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `Crews`
--
ALTER TABLE `Crew`
  MODIFY `crew_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `Genres`
--
ALTER TABLE `Genre`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `Movies`
--
ALTER TABLE `Movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `User`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Castings`
--
ALTER TABLE `Casting`
  ADD CONSTRAINT `Castings_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`movie_id`);

--
-- Contraintes pour la table `Crews`
--
ALTER TABLE `Crew`
  ADD CONSTRAINT `Crews_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`movie_id`);

--
-- Contraintes pour la table `MovieGenres`
--
ALTER TABLE `MovieGenre`
  ADD CONSTRAINT `MovieGenre_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`movie_id`),
  ADD CONSTRAINT `MovieGenre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `Genre` (`genre_id`);

--
-- Contraintes pour la table `MoviesMovies`
--
ALTER TABLE `MoviesMovie`
  ADD CONSTRAINT `MoviesMovie_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`movie_id`),
  ADD CONSTRAINT `MoviesMovie_ibfk_2` FOREIGN KEY (`movie_id_1`) REFERENCES `Movie` (`movie_id`);

--
-- Contraintes pour la table `MovieUsers`
--
ALTER TABLE `MovieUser`
  ADD CONSTRAINT `MovieUser_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`movie_id`),
  ADD CONSTRAINT `MovieUser_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Contraintes pour la table `UserGenre`
--
ALTER TABLE `UserGenre`
  ADD CONSTRAINT `UserGenre_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `Genre` (`genre_id`),
  ADD CONSTRAINT `UserGenre_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
