-- MariaDB dump 10.19  Distrib 10.5.19-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: conka
-- ------------------------------------------------------
-- Server version	10.5.19-MariaDB-0+deb11u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allowed_ips`
--

DROP TABLE IF EXISTS `allowed_ips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allowed_ips` (
  `ip` text NOT NULL,
  `bypass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowed_ips`
--

LOCK TABLES `allowed_ips` WRITE;
/*!40000 ALTER TABLE `allowed_ips` DISABLE KEYS */;
INSERT INTO `allowed_ips` VALUES ('::ffff:127.0.0.1','all');
/*!40000 ALTER TABLE `allowed_ips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animehour`
--

DROP TABLE IF EXISTS `animehour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animehour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pfad` text NOT NULL,
  `datei` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8618 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animehour`
--

LOCK TABLES `animehour` WRITE;
/*!40000 ALTER TABLE `animehour` DISABLE KEYS */;
/*!40000 ALTER TABLE `animehour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `played_song_history`
--

DROP TABLE IF EXISTS `played_song_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `played_song_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` text NOT NULL,
  `file` text NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `played_song_history`
--

LOCK TABLES `played_song_history` WRITE;
/*!40000 ALTER TABLE `played_song_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `played_song_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searchEntrys`
--

DROP TABLE IF EXISTS `searchEntrys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `searchEntrys` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41275 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searchEntrys`
--

LOCK TABLES `searchEntrys` WRITE;
/*!40000 ALTER TABLE `searchEntrys` DISABLE KEYS */;
/*!40000 ALTER TABLE `searchEntrys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `info` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'animehour',0,'Infotext'),(2,'contest',0,'Infotext'),(3,'wishtime',1,'');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pfad` text NOT NULL,
  `datei` text NOT NULL,
  `duration` varchar(11) DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  `kommentar` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=238375 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs_old`
--

DROP TABLE IF EXISTS `songs_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs_old` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pfad` text NOT NULL,
  `datei` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17348 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs_old`
--

LOCK TABLES `songs_old` WRITE;
/*!40000 ALTER TABLE `songs_old` DISABLE KEYS */;
/*!40000 ALTER TABLE `songs_old` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_songs`
--

DROP TABLE IF EXISTS `test_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_songs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pfad` text NOT NULL,
  `datei` text NOT NULL,
  `duration` varchar(11) DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  `kommentar` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9064 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_songs`
--

LOCK TABLES `test_songs` WRITE;
/*!40000 ALTER TABLE `test_songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist2`
--

DROP TABLE IF EXISTS `wishlist2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlist2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` text NOT NULL,
  `song_id` int(11) NOT NULL,
  `active` int(11) DEFAULT 1,
  `ip` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=630 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist2`
--

LOCK TABLES `wishlist2` WRITE;
/*!40000 ALTER TABLE `wishlist2` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 18:16:26
