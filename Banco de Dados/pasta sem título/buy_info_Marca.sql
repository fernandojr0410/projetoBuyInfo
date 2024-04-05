-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: buy_info
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Marca`
--

DROP TABLE IF EXISTS `Marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Marca` (
  `Id_Marca` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(45) NOT NULL,
  `Ativo` tinyint NOT NULL,
  PRIMARY KEY (`Id_Marca`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Marca`
--

LOCK TABLES `Marca` WRITE;
/*!40000 ALTER TABLE `Marca` DISABLE KEYS */;
INSERT INTO `Marca` VALUES (1,'Nvidia',1),(2,'Lorben',1),(3,'Positivo',1),(4,'Logitech',1),(5,'Jack Acessorios',1),(6,'Blue',1),(7,'Microsoft',1),(8,'Apple',1),(9,'Genérica',1),(10,'Trust',1),(11,'JACK3D.ACESSORIOS',1),(12,'Multilaser',1),(13,'LimitStore Acessórios',1),(14,'Maxprint',1),(15,'Forceline',1),(16,'Teclado',1),(17,'AMD',1),(18,'Qgeem',1),(19,'Furukawa',1),(20,'Sata',1),(21,'Ship G Eletronicos',1),(22,'Tomate',1),(23,'Inova',1),(24,'MB',1),(25,'Rochedão',1),(26,'Importador',1),(27,'KCSonline',1),(28,'Lehmox',1),(29,'Link',1),(30,'OEM',1),(31,'PowerX',1),(32,'Vinik',1),(33,'Montado',1),(34,'Nagano',1),(35,'Hayom',1),(36,'Rise Mode',1),(37,'K-Mex',1),(38,'Pichau',1),(39,'Hayom gb1749',1),(40,'Mymax',1),(41,'Fortrek',1),(42,'Dell',1),(43,'Deko',1),(44,'Brazil PC',1),(45,'Aerocool Advanced Technologies',1),(46,'C3Tech',1),(47,'One Power',1),(48,'Bluecase',1),(49,'Corsair',1),(50,'GameMax',1),(51,'Orionas',1),(52,'Kingston Hyper X',1),(53,'Micron',1),(54,'Kingston',1),(55,'Adata',1),(56,'EASY MEMORY',1),(57,'Corsair Vengeance',1),(58,'Kingston Value',1),(59,'Micron Crucial',1),(60,'XPG',1),(61,'Corsair Vengeance LPX',1),(62,' Kingston HyperX Fury ',1),(63,'Kingston Fury Beast',1),(64,'Kingston HyperX Fury',1),(65,'ISYNC',1),(66,'Machinist',1),(67,'GoLine',1),(68,'PC-Tech',1),(69,'Kazuk',1),(70,'Asus',1),(71,'Afox',1),(72,'Gigabyte',1),(73,'Intel',1),(74,'ATR005',1),(75,'Deepcool',1),(76,'T-Dagger',1),(77,'Master',1),(78,'Knup',1),(79,'AeroCool',1),(80,'Rise',1),(81,'Pcyes',1),(82,'Dex',1);
/*!40000 ALTER TABLE `Marca` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22 22:40:24
