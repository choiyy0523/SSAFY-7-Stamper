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
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_nickname` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (2,NULL,'Hong','실험용','실험용','$2a$10$EU1odj0wfJ5u3BUjB7SFY.a7JiQy9je9nUumw9E6w7nUptadaN9.e','01021598765'),(3,NULL,'test1','test1',NULL,'$2a$10$P4UXkjGoG2zI9T9eH865z.i94ebhg/D1Q6dIpe1QdtXQ6nGg8ezAq',NULL),(4,NULL,'test2','test2',NULL,'$2a$10$zR93cd1YU3fj0ymkY20McuZyoTghRcQAy9QFmsgyI3O48qODwoV8K',NULL),(5,NULL,'test3','test3',NULL,'$2a$10$HgbdVSXya3HiLhQlZaZ3v.5/90tJZKiWInIgdY8bILPJbHHP3OAAK',NULL),(6,NULL,'test4','test4','test4','$2a$10$8Dklx7y9njtucOJhiKhKVOEuAhXn93VUE3yv6xEHLlXvXXXDx/MxO',NULL),(7,NULL,'jaehyun','임재현','relajar','$2a$10$Jt7px2OgZG5nLBCb/LSXuuGPTKmKlp1AdZZKlxoJZxTBTNK9BBI/u',NULL),(8,NULL,'Kongkong','콩','콩','$2a$10$mfau0o/3.evhkwh4Fr44zeyMb/TjqLQiYPWwKQYA5IjFm8.aBCKG.',NULL),(9,NULL,'testch123','정찬희','정찬','$2a$10$rFTC8VUtpeiesScM4mj3qONM/3ffnokfsToDYVh7QGDYXnJlF.n9C',''),(10,'chan@gmail.com','testchan11','정찬희','정찬','$2a$10$.xZDSU0Lw5GAoz.Gibt69Ob1bNPvoYr8SfQHnxdseJ86Omg6Zdghq','01012345678'),(11,NULL,'test6','test6','test6','$2a$10$NfigkIoq2pm2Egkgbpc2beo1yuDuaXJ2MIl6Rsv2oKoLxzNglok5S','01000000000'),(12,NULL,'test7','test7','test7','$2a$10$mviPaMIzxrd9d328o0g9NOnGTjwBgcvBB/E2GaB3Bu.toRuoqYvLC','01000000000'),(13,NULL,'가입이안돼?','재현씨','재현씨','$2a$10$ttEJ6aViFQngitV25xf5/OkvQedZMe1A0sk2ozrrR7SzgMK6vOxMq','01011111111'),(14,NULL,'다시가입도전','재현씨','이상해씨','$2a$10$XC8uUkWFzcn70.sCeUlQTOdFggJCtOhgCmGKFWN0UNoOj9s66jGRW','210938012983'),(15,NULL,'test9','test9','test9','$2a$10$WT9SoK9Gqzf1D8/agMBA9OIrgpBxZbNAjJvDphrlh8yvX6shV1MlG','01000000000'),(16,NULL,'skehrks','이경준','경준닉','$2a$10$KZGiArb6DGKj1BlpXPwDXeMwGHCk2mtcFHC4poFAndp37lOQEntja','01045778961'),(17,NULL,'orion0','키키','마포빵돌','$2a$10$zSHMgWf.4LfAoKNBwqatBOkEFrUMA.1ogKi64cgeZUQePCYBTpdG.','0101010010'),(18,NULL,'relajar','임재현','임재현','$2a$10$IAnn/JFXy7x29TX/eigLuOMphonV3m2MP.nHPet4iVdCgSI5eQeQW','010123141241'),(19,NULL,'test10','test10','test10','$2a$10$lBvqkm6ogXyRXiIWI3sSgeKnHTP07LVBl6G4u60PrvySBtn5XDlcO','01000000000'),(20,'asdfasdf@asdfasdf.com','test11','test11','test11','$2a$10$q.J55wv8DCnA9ZF0kW9Z7uIaH2LRBoxTdl6NjDXdl75EgoEY7yNrC','010000001111'),(21,NULL,'emailtest','이메일','이메일닉','$2a$10$bTveZEuzlW8b/H1V0PqiAugS5ALPjeGHGp9vDcB0fkEL.Fiw6NPSi','01099998888'),(22,NULL,'11111','11111','11111','$2a$10$DsZVj.EphHTRXJwoDJR7uO/cAxd1ik/3mQPB7P4dTIKzm96Q0Fg66',''),(23,NULL,'22222','22222','22222','$2a$10$KCBNcvmCsQMVqY.732fkw.ATSr1dp7oQ77OMcjHcz4WrcxeRT2LdO','22222'),(24,NULL,'33333','33333','33333','$2a$10$a38m6c.UFlXtk98FDlPNV.1ZqKdziTAPp/tX1z.ozG8DlNCZ/QA.O','33333'),(25,'44444','44444','44444','44444','$2a$10$n/S7FseehmN9VMsSZTxpxuzf9ZByJhRf6SlFiNGcCAQuTIKAD/Xi6','44444'),(26,'oct301@naver.com','rewardtest','경준','나도간','$2a$10$JX9fhQFPFipIKEuOCdc5auFtf4hblzzS5oYmCLG0ogG4I9nKx6GAG','01045778961'),(27,'adokids2@gmail.com','adokids2','최윤영','윤영쓰','$2a$10$zUjVW7gadNB66rcjPrOVs.d6zF4gCGIF2RGIpmhnYuQcRoeaixs.S','01077245870'),(28,'testjung@ssafy.com','testjung11','희찬정','찬정','$2a$10$QEPU5rgDcLQmt33gMGj9Z.G0A3WscBohj0u3J9qxPJHv0wIMABTm.','01012345678'),(29,'abcde@naver.com','abcde','홍길동','스탬퍼가될래요','$2a$10$GzD4RcTR7nHJMwK2ZoJ75OktHfaLv3XL44W/Y90WcF1NH39Hn1h1G','010-0000-0000'),(30,'asdf@asdf','Honghong','홍인호','콩','$2a$10$BVUb8jE0EQ6YJmOuEgdUpOtivwGqEVOT.KoMbng3BG.Mx9Q3OcbAC','01099998888'),(31,'asdf@asdf','honginho','홍인호','콩','$2a$10$qCWAOwAaX/McJTnXwazLJed21Xebe6rofusZ4Esq8grM2jl0ww4W.','01099998888');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:31:02
