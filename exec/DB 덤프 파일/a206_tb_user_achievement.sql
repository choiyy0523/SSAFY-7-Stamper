-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j7a206.p.ssafy.io    Database: a206
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `tb_user_achievement`
--

DROP TABLE IF EXISTS `tb_user_achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_achievement` (
  `user_achievement_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_achievement_time` varchar(255) DEFAULT NULL,
  `achieve_seq` bigint DEFAULT NULL,
  `user_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`user_achievement_seq`),
  KEY `FKgqs5cl7ncjo3fiob88le7bgq` (`achieve_seq`),
  KEY `FK1gwrt0aap7bflxb5evq8j51vt` (`user_seq`),
  CONSTRAINT `FK1gwrt0aap7bflxb5evq8j51vt` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`),
  CONSTRAINT `FKgqs5cl7ncjo3fiob88le7bgq` FOREIGN KEY (`achieve_seq`) REFERENCES `tb_achievement` (`achieve_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_achievement`
--

LOCK TABLES `tb_user_achievement` WRITE;
/*!40000 ALTER TABLE `tb_user_achievement` DISABLE KEYS */;
INSERT INTO `tb_user_achievement` VALUES (57,'2022-10-06 PM 07:11:26 UTC',109,8),(58,'2022-10-06 PM 07:22:46 UTC',109,31),(59,'2022-10-06 PM 07:22:47 UTC',52,31),(60,'2022-10-06 PM 07:22:48 UTC',76,31);
/*!40000 ALTER TABLE `tb_user_achievement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:31:01
