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
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cliente` (
  `Id_Cliente` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL,
  `Sobrenome` varchar(255) NOT NULL,
  `CPF` varchar(14) NOT NULL,
  `Telefone` varchar(45) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  PRIMARY KEY (`Id_Cliente`,`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` VALUES (1,'fernando','junior','121.212.121-21','45999174178','fernando.jr0410@gmail.com','111111'),(2,'fernando','junior','123.123.123-12','234234234234','fernando.jr0410@gmail.com','111111'),(3,'fernando','teste','131.212.312-31','45999174178','fernando.jr0410@gmail.com','qqqqqq'),(4,'juca','teste','564.654.654-56','45999174178','fernando.jr0410@gmail.com','qqqqqq'),(5,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','qqqqqq'),(6,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','qqqqqq'),(7,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','qqqqqq'),(8,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','qqqqqq'),(9,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','111111'),(10,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','111111'),(11,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','1111111'),(12,'juca','teste','121.212.121-21','45999174178','fernando.jr0410@gmail.com','111111'),(13,'teste','teste','123.123.123-12','45999174178','teste@hotmail.com','123123'),(14,'kkkk','kkk','132.312.312-31','45999174178','kkkk@hotmail.com','123123'),(15,'nomedeteste','meutitiolindo','123.123.131-23','45999174178','meutitiolindo@hotmail.com','123123'),(16,'nomedeteste','meutitiolindo','123.123.123-12','45999174178','meutitiolindo@hotmail.com','123123'),(17,'teste','teste','121.212.121-21','45999174178','kkkk@hotmail.com','123123'),(18,'juca','teste','123.123.131-23','45999174178','meutitiolindo@hotmail.com','123123'),(19,'titio','titio','546.546.546-54','45999174178','kkkk@hotmail.com','123123'),(20,'testeee','tesst','231.231.231-23','45999174178','kkkk@hotmail.com','qqqqqq'),(21,'joao','carlos','213.123.123-12','45999735848','joao.carlos@gmail.com','123456'),(22,'Thiago','da tia rita','123.123.123-12','45999174178','thiago.tiarita@gmail.com','123123');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
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
