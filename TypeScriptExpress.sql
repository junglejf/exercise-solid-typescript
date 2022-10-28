CREATE DATABASE IF NOT EXISTS `TypeScriptExpress`;
USE `TypeScriptExpress`;

DROP TABLE IF EXISTS `plants`;
CREATE TABLE `plants` (
  `id` int NOT NULL AUTO_INCREMENT, 
  `breed` varchar(100) NOT NULL, 
  `size` int NOT NULL, 
  `needs_sun` boolean NOT NULL, 
  `origin` varchar(250) NOT NULL,
  `waterFrequency` int DEFAULT 0,
  PRIMARY KEY (`id`)
);

INSERT INTO `plants` 
VALUES 
  (1, 'Bromelia', 102, false, 'Argentina', 3), 
  (2, 'Orquidea', 99, true, 'Brazil', 0);
