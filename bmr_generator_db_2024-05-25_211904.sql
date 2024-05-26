-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bmr_generator_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `additional_equipment`
--

DROP TABLE IF EXISTS `additional_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `additional_equipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `additional_equipment`
--

/*!40000 ALTER TABLE `additional_equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `additional_equipment` ENABLE KEYS */;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `typicalactivity_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `FKt7mgsnn8c87im033m33w1y4oo` (`typicalactivity_id`),
  CONSTRAINT `FKt7mgsnn8c87im033m33w1y4oo` FOREIGN KEY (`typicalactivity_id`) REFERENCES `typicalactivity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (97,'balances',NULL),(98,'reactor',NULL),(99,'d_filter',NULL),(100,'n_filter',NULL),(101,'p_pump',NULL),(102,'conv_oven',NULL),(103,'vac_oven',NULL),(104,'o_pump',NULL),(105,'m_pump',NULL);
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;

--
-- Table structure for table `equipment_info`
--

DROP TABLE IF EXISTS `equipment_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `equipment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa64ydthsvf008ummgyrfbbmyo` (`equipment_id`),
  CONSTRAINT `FKa64ydthsvf008ummgyrfbbmyo` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=642 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_info`
--

/*!40000 ALTER TABLE `equipment_info` DISABLE KEYS */;
INSERT INTO `equipment_info` VALUES (578,'007-1','max=3kg',97),(579,'007-10','max=2kg',97),(580,'007-12','max=1kg',97),(581,'007-16','max=220kg',97),(582,'007-21','max=1.3kg',97),(583,'007-25','max=3.5kg',97),(584,'007-26','max=3.5kg',97),(585,'007-27','max=3.5kg',97),(586,'007-34','max=3.5kg',97),(587,'007-6','max=10kg',97),(588,'007-20','max=3kg',97),(589,'007-23','max=150kg',97),(590,'007-24','max=30kg',97),(591,'007-39','max=30kg',97),(592,'007-40','max=30kg',97),(593,'007-41','max=3kg',97),(594,'007-42','max=30kg',97),(595,'007-43','max=1kg',97),(596,'007-44','max=120kg',97),(597,'007-45','max=60kg',97),(598,'002-10','30L glass',98),(599,'002-11','15L glass',98),(600,'002-12','150L glass',98),(601,'002-13','100L glass',98),(602,'002-14','100L g-lined',98),(603,'002-15','150L glass',98),(604,'002-16','50L glass',98),(605,'002-17','100L glass',98),(606,'046-4','ss 40/80L',99),(607,'046-6','ss 30/45L',99),(608,'046-7','ss agit 100/140L',99),(609,'046-1','',100),(610,'046-13','',100),(611,'046-14','',100),(612,'046-2','',100),(613,'046-3','',100),(614,'001-13','',101),(615,'001-21','',101),(616,'001-29','',101),(617,'012-13','',102),(618,'012-14','',102),(619,'012-16','',102),(620,'012-6','',102),(621,'012-10','',103),(622,'012-15','',103),(623,'012-17','',103),(624,'012-9','',103),(625,'001-38','',104),(626,'001-43','',104),(627,'001-22','',105),(628,'001-23','',105),(629,'001-24','',105);
/*!40000 ALTER TABLE `equipment_info` ENABLE KEYS */;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `whcode` varchar(255) DEFAULT NULL,
  `additionalinfo` varchar(255) DEFAULT NULL,
  `mass` double DEFAULT NULL,
  `max_mass` double DEFAULT NULL,
  `min_mass` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `volume` double DEFAULT NULL,
  `maxmass` double DEFAULT NULL,
  `minmass` double DEFAULT NULL,
  `processoperation_in_id` bigint DEFAULT NULL,
  `processoperation_out_id` bigint DEFAULT NULL,
  `processoperation_product` bigint DEFAULT NULL,
  `processoperation_starting` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_3dqad2ndd75s3hn1dymiipb0t` (`processoperation_in_id`),
  UNIQUE KEY `UK_3xhrty3uofx0yji47bwflmmos` (`processoperation_out_id`),
  UNIQUE KEY `UK_p5vsr2dmi7usmrh5ehlequ9ur` (`processoperation_product`),
  UNIQUE KEY `UK_9a8efwkl8nqmfhchvalkcujcv` (`processoperation_starting`),
  CONSTRAINT `FK14ppcuqs67gceit9r61xcktf9` FOREIGN KEY (`processoperation_out_id`) REFERENCES `processoperation` (`id`),
  CONSTRAINT `FK47sjqnerx1mimwjhqtmups65r` FOREIGN KEY (`processoperation_starting`) REFERENCES `processoperation` (`id`),
  CONSTRAINT `FK6r8497t604ufydl9b5skrnt6j` FOREIGN KEY (`processoperation_in_id`) REFERENCES `processoperation` (`id`),
  CONSTRAINT `FKku2k0kn1ojiqirkukfjussmj2` FOREIGN KEY (`processoperation_product`) REFERENCES `processoperation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (7,'','',-1,NULL,NULL,'',-1,-1,-1,122,NULL,NULL,NULL),(22,'','',-1,NULL,NULL,'',-1,-1,-1,137,NULL,NULL,NULL),(23,'','',-1,NULL,NULL,'sm.1',-1,-1,-1,138,NULL,NULL,NULL);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;

--
-- Table structure for table `operation`
--

DROP TABLE IF EXISTS `operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) DEFAULT NULL,
  `operation_type` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  `equipment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi420a1cyljrjltekc81vqbstg` (`equipment_id`),
  CONSTRAINT `FKi420a1cyljrjltekc81vqbstg` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation`
--

/*!40000 ALTER TABLE `operation` DISABLE KEYS */;
INSERT INTO `operation` VALUES (206,'Reactor preparation:\nThe reactor {reactor} and thermostat are checked to be ready for work.','prepare_of_reactor','',98),(207,'Loading into reactor:\nRequired amount of {material} is weighed on the balances. \nWeighted material is loaded into reactor {reactor} in portions.\n\nSpecified amount: ….. kg (….. - ….. kg)','material_load_of_solid','Warehouse \"code\": ...........\nActual loading: ....... kg',98),(208,'Loading into reactor:\nRequired amount of {material} is weighed on the balances. \nUsing peristaltic pump {p_pump}, weighted material is pumped into the reactor.\n\nSpecified amount: ….. kg (….. - ….. kg)','material_load_of_liquid','Warehouse \"code\": ...........\nActual loading: ....... kg\nActual pump setting: ..... %',98),(209,'Loading into dropping funnel:\nThe required amount of {material} is weighed on the balances. \nUsing peristaltic pump {p_pump}, weighted material is pumped into the dosing system.\n\nSpecified amount: ….. kg (….. - ….. kg)','material_load_drop_funnel','Warehouse \"code\": ...........\nActual loading: ....... kg\nActual pump setting: ..... %',98),(210,'Dropwise addition:\nMaterial is added dropwise from dropping funnel.\nAddition is temperature controlled.\nKeep the temperature of reaction mixture in range {targetTempMin}{targetTempMax}°C.\nStirring is set to range {rpmMin}{rpmMax} rpm.','material_add_dropwise','Actual thermostat setting: ..... °C\nActual stirring setting: .... rpm',98),(211,'Argon flow:\nArgon line is connected and set to {flowMin}{flowMax} l/min.','argon_start_flow','Actual flow setting: .... l/min',98),(212,'The argon flow is closed.','argon_stop_flow','Actual flow setting: .... l/min',98),(213,'Hold time:\nReaction mixture is stirred during {durationMin}{durationMax}.\nTemperature set is {targetTempMin}{targetTempMax}°C.\nStirring is set to {rpmMin}{rpmMax} rpm.','reaction_hold_time','Actual temp setting: ..... °C\nActual stirring setting: .... rpm',98),(214,'<Heating/cooling> of reactor {reactor} is turned ON.\nThe target temperature range is {targetTempMin}{targetTempMax}°C.','reaction_heat/cool_ON','Actual temp setting: ..... °C',98),(215,'Vacuum distillation:\nSolvent is distilled out from reactor.\nTap water for condenser is turned ON.\nHeating is set {targetTempMin}{targetTempMax}°C.\nStirring is set {rpmMin}{rpmMax} rpm.\nVacuum is gradually decreased in range {vpumpTorrMin}{vpumpTorrMax} torr.\nDistillation is continued until <conditions>.','vac_dist.','Actual temp setting: ..... °C\nActual stirring setting: ..... rpm\nActual vacuum setting: ..... Torr',98),(216,'<Solution/suspension> from reactor is pumped using peristaltic pump into <to where?>.','material_unload','',98),(217,'Filter preparation:\nThe filter {d_filter} is assembled and prepared to work.\nThe filtration cloth is prepared and properly installed.\nArgon and product lines are connected to the lid, pressure test is done.','prepare_filter','',99),(218,'Product is loaded from reactor {reactor} on the filter {d_filter}.\nThe Argon line is closed during loading.\nOnce 2/3 of the filter is loaded, stop pumping and close the product line.','load_on_filter','',99),(219,'Filtration:\nProduct is filtrated using argon flow {flowMin}{flowMax} l/min','filtration_with_argon','',99),(220,'Emptying the receiver:\nFiltrate is discharged from the filter into <to where>','discharg_ML','',99),(221,'Washing filter cake:\nFilter cake is washied with required amount of solvent {material}.\nAfter loading, the solvent is pushed through the filter cake with argon pressure {flowMin}{flowMax} l/min.\n\nSpecified amount: ….. kg (….. - ….. kg)','wash_FK','Warehouse \"code\": ...........\nActual loading: ....... kg',99),(222,'Drying on filter:\nThe filter cake is additionally dried on the filter {d_filter} using argon flow.\nArgon is set to {flowMin}{flowMax} l/min.\nDrying on the filter is continued for {durationMin}{durationMax} min.','dry_on_filter','Actual flow setting: .... l/min',99),(223,'Material from the filter {d_filter} is unloaded <to where>.','unload_from_filter','Actual weigh: ....... kg',99),(224,'Filter preparation:\nThe filter {n_filter} is assembled and prepared to work.\nThe filtration cloth is prepared and properly installed.\nMembrane pump {m_pump} is connected.','prepare_filter','',100),(225,'Membrane pump {m_pump} is started.\nThe product is loaded on the filter {n_filter}.','load_on_filter','',100),(226,'Emptying the receiver:\nFiltrate is discharged from the filter into <to where>','discharg_ML','',100),(227,'Washing filter cake:\nMake sure the pump is stopped.\nThe required amount of {material} is weighed on the balances {balances} and loaded on top of filter cake.\nThe filter cake is thoroughly mixed.\n\nSpecified amount: ….. kg (….. - ….. kg)','wash_FK','Warehouse \"code\": ...........\nActual loading: ....... kg',100),(228,'Drying on filter:\nThe filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it.\nMembrane pump {m_pump} is set to range {vpumpTorrMin}{vpumpTorrMax} Torr.\nDrying on the filter is continued for {durationMin}{durationMax} min.\nAfter the required time is passed, the pump is stopped.','dry_on_filter','Actual plump setting: ..... Torr',100),(229,'The material from the filter is unloaded <to where>.','unload_from_filter','Actual weight: ....... kg',100),(230,'Peristaltic pump {p_pump} is set to {ppumpSetMin} {ppumpSetMax} %.\nPump is turned ON','pump_ON','',101),(231,'Product is loaded on trays.\nEach tray is weighed on balances {balances}, data is recorded into Table <number>.\nTray is placed into drying oven.\nAfter all product is loaded on trays and placed into oven, the oven is clodes.\nHeating is set {targetTempMin}{targetTempMax}°C.\nTimer is set to {durationMin}{durationMax}.\nThe dryining starts.','material_load_on_trays','',102);
/*!40000 ALTER TABLE `operation` ENABLE KEYS */;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter`
--

/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
INSERT INTO `parameter` VALUES (2,'durationMax'),(1,'durationMin'),(6,'finalTempSet'),(11,'flowMax'),(10,'flowMin'),(5,'initialTempSet'),(13,'ppumpSetMax'),(12,'ppumpSetMin'),(7,'processTemp'),(9,'rpmMax'),(8,'rpmMin'),(4,'targetTempMax'),(3,'targetTempMin'),(18,'vpumpTorrMax'),(15,'vpumpTorrMin'),(14,'vpumpTorrProcess');
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;

--
-- Table structure for table `processequipment`
--

DROP TABLE IF EXISTS `processequipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processequipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `processoperation_id` bigint DEFAULT NULL,
  `typicalactivity_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_dsphf1dtv25v75onrmsn4sn80` (`processoperation_id`),
  KEY `FKpwo49gux8ju2xe8snrffdvrla` (`typicalactivity_id`),
  CONSTRAINT `FK7nb4yy7cxr8ffv8dughy2b7x` FOREIGN KEY (`processoperation_id`) REFERENCES `processoperation` (`id`),
  CONSTRAINT `FKpwo49gux8ju2xe8snrffdvrla` FOREIGN KEY (`typicalactivity_id`) REFERENCES `typicalactivity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processequipment`
--

/*!40000 ALTER TABLE `processequipment` DISABLE KEYS */;
INSERT INTO `processequipment` VALUES (14,'002-15','reactor',122,NULL),(39,'002-15','reactor',137,NULL),(40,'002-15','reactor',NULL,102),(41,'002-15','reactor',138,NULL),(42,'002-15','reactor',NULL,103);
/*!40000 ALTER TABLE `processequipment` ENABLE KEYS */;

--
-- Table structure for table `processinitialinfo`
--

DROP TABLE IF EXISTS `processinitialinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processinitialinfo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `projectname` varchar(255) NOT NULL,
  `tp` varchar(255) NOT NULL,
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKn2jstrla6eaxsronyjn39ft1n` (`projectname`,`tp`,`version`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processinitialinfo`
--

/*!40000 ALTER TABLE `processinitialinfo` DISABLE KEYS */;
INSERT INTO `processinitialinfo` VALUES (29,'SampleProject7','SampleTP','1.0'),(41,'','',''),(69,'test','tp.1','1.0'),(176,'test2','tp.2','2.2'),(177,'test','tp.1','1.1'),(202,'test2','tp.1','1.0');
/*!40000 ALTER TABLE `processinitialinfo` ENABLE KEYS */;

--
-- Table structure for table `processoperation`
--

DROP TABLE IF EXISTS `processoperation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processoperation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `opnumber` int NOT NULL,
  `projectname` varchar(255) NOT NULL,
  `tp` varchar(255) NOT NULL,
  `main_equipment_id` bigint DEFAULT NULL,
  `input_material_id` bigint DEFAULT NULL,
  `output_material_id` bigint DEFAULT NULL,
  `version` varchar(255) NOT NULL,
  `product_material_id` bigint DEFAULT NULL,
  `starting_material_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kyky` (`version`,`opnumber`,`tp`),
  UNIQUE KEY `UK_ryq46iiadjn8lhcihxp2synnr` (`main_equipment_id`),
  UNIQUE KEY `UK_t0gagg31u5c6jtgu3lflvw79j` (`input_material_id`),
  UNIQUE KEY `UK_e97v662y1k4xoa1am617ujlda` (`output_material_id`) /*!80000 INVISIBLE */,
  UNIQUE KEY `UK_40ochcn22klh07v313tdbtbu5` (`product_material_id`),
  UNIQUE KEY `UK_97p8uw50rnpgva0p7nokqasw7` (`starting_material_id`),
  CONSTRAINT `FK2kqhmafxg6rkpep77j5itjj68` FOREIGN KEY (`input_material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `FK31xkxk376yx4awts37yl6nrul` FOREIGN KEY (`starting_material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `FKawleubx6defxxlgytwjuukl63` FOREIGN KEY (`product_material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `FKbbmj2ehpas8hfyle8dbgwut1u` FOREIGN KEY (`output_material_id`) REFERENCES `material` (`id`),
  CONSTRAINT `FKdqr6n1jjtsqlbt4j8mbd2tunf` FOREIGN KEY (`main_equipment_id`) REFERENCES `processequipment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processoperation`
--

/*!40000 ALTER TABLE `processoperation` DISABLE KEYS */;
INSERT INTO `processoperation` VALUES (39,1,'','',NULL,NULL,NULL,'',NULL,NULL),(93,1,'test','tp.1',NULL,NULL,NULL,'1.1',NULL,NULL),(112,2,'test','tp.1',NULL,NULL,NULL,'1.1',NULL,NULL),(113,3,'test','tp.1',NULL,NULL,NULL,'1.1',NULL,NULL),(114,4,'test','tp.1',NULL,NULL,NULL,'1.1',NULL,NULL),(115,5,'test','tp.1',NULL,NULL,NULL,'1.1',NULL,NULL),(116,6,'test','tp.1',NULL,NULL,NULL,'1.1',NULL,NULL),(122,7,'test','tp.1',14,7,NULL,'1.1',NULL,NULL),(137,1,'test2','tp.1',39,22,NULL,'1.0',NULL,NULL),(138,2,'test2','tp.1',41,23,NULL,'1.0',NULL,NULL);
/*!40000 ALTER TABLE `processoperation` ENABLE KEYS */;

--
-- Table structure for table `projectequipment`
--

DROP TABLE IF EXISTS `projectequipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectequipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `processinitialinfo_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhc0vow42quvbfjuryx951vjyw` (`processinitialinfo_id`),
  CONSTRAINT `FKhc0vow42quvbfjuryx951vjyw` FOREIGN KEY (`processinitialinfo_id`) REFERENCES `processinitialinfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectequipment`
--

/*!40000 ALTER TABLE `projectequipment` DISABLE KEYS */;
INSERT INTO `projectequipment` VALUES (1,'EQ1','Equipment 1',29),(2,'EQ2','Equipment 2',29),(46,'007-1','balancesid1_0',69),(47,'002-10','reactorid1_7',69),(225,'007-1','balancesid1_0',176),(226,'002-15','reactorid1_7',176),(227,'007-12','balancesid1_0',177),(228,'012-13','conv_ovenid1_1',177),(229,'001-23','m_pumpid1_3',177),(230,'001-13','p_pumpid1_6',177),(231,'002-15','reactorid1_7',177),(332,'007-10','balancesid1_0',202),(333,'012-13','conv_ovenid1_1',202),(334,'001-21','p_pumpid1_6',202),(335,'002-15','reactorid1_7',202);
/*!40000 ALTER TABLE `projectequipment` ENABLE KEYS */;

--
-- Table structure for table `projectreagent`
--

DROP TABLE IF EXISTS `projectreagent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectreagent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tableid` varchar(255) NOT NULL,
  `processinitialinfo_id` bigint DEFAULT NULL,
  `mass` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs1i1bioffe8drev0k46xlyavh` (`processinitialinfo_id`),
  CONSTRAINT `FKs1i1bioffe8drev0k46xlyavh` FOREIGN KEY (`processinitialinfo_id`) REFERENCES `processinitialinfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectreagent`
--

/*!40000 ALTER TABLE `projectreagent` DISABLE KEYS */;
INSERT INTO `projectreagent` VALUES (1,'Reagent 1','R1',29,0),(2,'Reagent 2','R2',29,0),(22,'testreag1','reagent0',69,1),(112,'aaaa','reagent0',176,2),(113,'aaa','reagent0',177,1),(141,'sm.1','reagent0',202,1.1);
/*!40000 ALTER TABLE `projectreagent` ENABLE KEYS */;

--
-- Table structure for table `typicalactivity`
--

DROP TABLE IF EXISTS `typicalactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typicalactivity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) DEFAULT NULL,
  `durationmax` int DEFAULT NULL,
  `durationmin` int DEFAULT NULL,
  `flowmax` double DEFAULT NULL,
  `flowmin` double DEFAULT NULL,
  `initialtempset` double DEFAULT NULL,
  `operationtype` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  `ppumpsetmax` double DEFAULT NULL,
  `ppumpsetmin` double DEFAULT NULL,
  `processtemp` double DEFAULT NULL,
  `rpmmax` double DEFAULT NULL,
  `rpmmin` double DEFAULT NULL,
  `targettempmax` double DEFAULT NULL,
  `targettempmin` double DEFAULT NULL,
  `vpumptorrmax` double DEFAULT NULL,
  `vpumptorrmin` double DEFAULT NULL,
  `vpumptorrprocess` double DEFAULT NULL,
  `activitytype` varchar(255) DEFAULT NULL,
  `finaltempset` double DEFAULT NULL,
  `processoperation_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_kc0ehbam0cew6o3lnvmsjypm7` (`processoperation_id`),
  CONSTRAINT `FK3lotlrs8ow04eukmal0x2bgws` FOREIGN KEY (`processoperation_id`) REFERENCES `processoperation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typicalactivity`
--

/*!40000 ALTER TABLE `typicalactivity` DISABLE KEYS */;
INSERT INTO `typicalactivity` VALUES (20,'Loading into reactor:\r\nRequired amount of <select name=\"material\"><option value=\"\">--select--</option></select> is weighed on the balances. \r\nWeighted material is loaded into reactor <select name=\"reactor\"><option value=\"002-11\">002-11</option></select> in portions.\r\n\r\nSpecified amount: ….. kg (….. - ….. kg)',-1,-1,-1,-1,-1,NULL,'Warehouse \"code\": ...........\r\nActual loading: ....... kg',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'material_load_of_solid',NULL,39),(58,'Product is loaded on trays.\r\nEach tray is weighed on balances {balances}, data is recorded into Table <number>.\r\nTray is placed into drying oven.\r\nAfter all product is loaded on trays and placed into oven, the oven is clodes.\r\nHeating is set <input type=\"text\" name=\"targetTempMin\" id=\"targetTempMin\" placeholder=\"targetTempMin\"><input type=\"text\" name=\"targetTempMax\" id=\"targetTempMax\" placeholder=\"targetTempMax\">°C.\r\nTimer is set to <input type=\"text\" name=\"durationMin\" id=\"durationMin\" placeholder=\"durationMin\"><input type=\"text\" name=\"durationMax\" id=\"durationMax\" placeholder=\"durationMax\">.\r\nThe dryining starts.',NULL,NULL,-1,-1,-1,NULL,'',-1,-1,-1,-1,-1,NULL,NULL,-1,-1,-1,'material_load_on_trays',NULL,93),(77,'Reactor preparation:\r\nThe reactor <select name=\"reactor\"><option value=\"002-15\">002-15</option></select> and thermostat are checked to be ready for work.',-1,-1,-1,-1,-1,NULL,'',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'prepare_of_reactor',NULL,112),(78,'<Solution/suspension> from reactor is pumped using peristaltic pump into <to where?>.',-1,-1,-1,-1,-1,NULL,'',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'material_unload',NULL,113),(79,'Loading into reactor:\r\nRequired amount of <select name=\"material\"><option value=\"\">--select--</option><option value=\"aaa\">aaa - 1</option></select> is weighed on the balances. \r\nWeighted material is loaded into reactor <select name=\"reactor\"><option value=\"002-15\">002-15</option></select> in portions.\r\n\r\nSpecified amount: ….. kg (….. - ….. kg)',-1,-1,-1,-1,-1,NULL,'Warehouse \"code\": ...........\r\nActual loading: ....... kg',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'material_load_of_solid',NULL,114),(80,'Peristaltic pump <select name=\"p_pump\"><option value=\"001-13\">001-13</option></select> is set to <input type=\"text\" name=\"ppumpSetMin\" id=\"ppumpSetMin\" placeholder=\"ppumpSetMin\"> <input type=\"text\" name=\"ppumpSetMax\" id=\"ppumpSetMax\" placeholder=\"ppumpSetMax\"> %.\r\nPump is turned ON',-1,-1,-1,-1,-1,NULL,'',22,11,-1,-1,-1,-1,-1,-1,-1,-1,'pump_ON',NULL,115),(81,'Peristaltic pump <select name=\"p_pump\"><option value=\"001-13\">001-13</option></select> is set to <input type=\"text\" name=\"ppumpSetMin\" id=\"ppumpSetMin\" placeholder=\"ppumpSetMin\"> <input type=\"text\" name=\"ppumpSetMax\" id=\"ppumpSetMax\" placeholder=\"ppumpSetMax\"> %.\r\nPump is turned ON',-1,-1,-1,-1,-1,NULL,'',22,11,-1,-1,-1,-1,-1,-1,-1,-1,'pump_ON',NULL,116),(87,'Loading into reactor:\r\nRequired amount of <select name=\"material\"><option value=\"\">--select--</option><option value=\"aaa\">aaa - 1</option></select> is weighed on the balances. \r\nWeighted material is loaded into reactor <select name=\"reactor\"><option value=\"002-15\">002-15</option></select> in portions.\r\n\r\nSpecified amount: ….. kg (….. - ….. kg)',-1,-1,-1,-1,-1,NULL,'Warehouse \"code\": ...........\r\nActual loading: ....... kg',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'material_load_of_solid',NULL,122),(102,'Reactor preparation:\nThe reactor {reactor} and thermostat are checked to be ready for work.',-1,-1,-1,-1,-1,NULL,'',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'prepare_of_reactor',NULL,137),(103,'Loading into reactor:\nRequired amount of {material} is weighed on the balances. \nWeighted material is loaded into reactor {reactor} in portions.\n\nSpecified amount: ….. kg (….. - ….. kg)',-1,-1,-1,-1,-1,NULL,'Warehouse \"code\": ...........\r\nActual loading: ....... kg',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,'material_load_of_solid',NULL,138);
/*!40000 ALTER TABLE `typicalactivity` ENABLE KEYS */;

--
-- Table structure for table `waste`
--

DROP TABLE IF EXISTS `waste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waste` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `additionalinfo` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `mass` double DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `volume` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste`
--

/*!40000 ALTER TABLE `waste` DISABLE KEYS */;
/*!40000 ALTER TABLE `waste` ENABLE KEYS */;

--
-- Dumping routines for database 'bmr_generator_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 21:19:14
