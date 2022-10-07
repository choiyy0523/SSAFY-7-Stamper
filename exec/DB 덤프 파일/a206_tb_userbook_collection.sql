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
-- Table structure for table `tb_userbook_collection`
--

DROP TABLE IF EXISTS `tb_userbook_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_userbook_collection` (
  `userbook_collection_seq` bigint NOT NULL AUTO_INCREMENT,
  `userbook_collection_category` varchar(255) DEFAULT NULL,
  `userbook_collection_date` varchar(255) DEFAULT NULL,
  `userbook_collection_gugun` varchar(255) DEFAULT NULL,
  `userbook_collection_image` varchar(255) DEFAULT NULL,
  `book_seq` bigint DEFAULT NULL,
  `user_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`userbook_collection_seq`),
  KEY `FK8i8p31ephj05wxhak7s2j2rtq` (`book_seq`),
  KEY `FKh0ovybrv7c35jwg8it4uf46au` (`user_seq`),
  CONSTRAINT `FK8i8p31ephj05wxhak7s2j2rtq` FOREIGN KEY (`book_seq`) REFERENCES `tb_book` (`book_seq`),
  CONSTRAINT `FKh0ovybrv7c35jwg8it4uf46au` FOREIGN KEY (`user_seq`) REFERENCES `tb_user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_userbook_collection`
--

LOCK TABLES `tb_userbook_collection` WRITE;
/*!40000 ALTER TABLE `tb_userbook_collection` DISABLE KEYS */;
INSERT INTO `tb_userbook_collection` VALUES (96,'기타','2022-10-06 PM 07:11:25 UTC','강북구','https://stamperimage.s3.ap-northeast-2.amazonaws.com/userimg/ec37a690-04d6-4c42-b499-bb142add73eaScreenshot_20221005-200341_Chrome',202,8),(97,'명소','2022-10-06 PM 07:22:44 UTC','송파구','https://stamperimage.s3.ap-northeast-2.amazonaws.com/userimg/232585b3-3e46-41b1-9fdc-3616a0c1e6fd롯타',64,31);
/*!40000 ALTER TABLE `tb_userbook_collection` ENABLE KEYS */;
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
