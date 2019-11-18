CREATE TABLE `karmacube`.`t_utilisateurs` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(45) NULL,
  `Prenom` VARCHAR(45) NULL,
  `Etat` INT NULL,
  `Nationalite` INT NULL,
  `MotDePasse` VARCHAR(100) NULL,
  `Karma` INT NULL,
  `Email` VARCHAR(50) NULL,
  `Argents` INT NULL,
  `DateDeModification` DATETIME NULL,
  `DateDeCreation` DATETIME NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `karmacube`.`t_karmas` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Confiance` INT NULL,
  `Experience` INT NULL,
  `DateDeModification` DATETIME NULL,
  `DateDeCreation` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
CREATE TABLE `karmacube`.`t_quetes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(100) NULL,
  `Experience` INT NULL,
  `Mairie` INT NULL,
  `DateDeModification` DATETIME NULL,
  `DateDeCreation` DATETIME NULL,
  PRIMARY KEY (`Id`));

CREATE TABLE `karmacube`.`t_mairies` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(45) NULL,
  `Tax` VARCHAR(45) NULL,
  `DateDeModification` DATETIME NULL,
  `DateDeCreation` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
  CREATE TABLE `karmacube`.`t_batiments` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(50) NULL,
  `DateDeModification` DATETIME NULL,
  `DateDeCreation` DATETIME NULL,
  PRIMARY KEY (`Id`));

CREATE TABLE `t_etape_quetes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Numero` int(11) DEFAULT NULL,
  `Nom` varchar(100) DEFAULT NULL,
  `DateDeModification` datetime DEFAULT NULL,
  `DateDeCreation` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`));
  
CREATE TABLE `karmacube`.`t_cubes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Materiau` INT NULL,
  `Dimension` INT NULL,
  `DateDeModification` DATETIME NULL,
  `DateDeCreation` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
 CREATE TABLE `t_materiaux` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Texture` longtext,
  `Durabilite` int(11) DEFAULT NULL,
  `Nom` varchar(50) DEFAULT NULL,
  `Densite` int(11) DEFAULT NULL,
  `DateDeModification` datetime DEFAULT NULL,
  `DateDeCreation` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


