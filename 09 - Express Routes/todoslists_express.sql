# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: todolist
# Generation Time: 2021-01-02 14:51:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table lists
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lists`;

CREATE TABLE `lists` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `list_userId` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;

INSERT INTO `lists` (`id`, `name`, `user_id`, `created_at`, `update_at`)
VALUES
	(1,'Mysql',1,'2020-12-31 16:32:46','2020-12-31 17:51:29'),
	(6,NULL,1,'2020-12-31 17:10:13',NULL),
	(8,NULL,1,'2020-12-31 17:38:59',NULL),
	(9,NULL,1,'2020-12-31 17:40:02',NULL),
	(10,NULL,1,'2020-12-31 17:40:37',NULL),
	(11,'Nodess',1,'2020-12-31 17:41:24',NULL);

/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `todo` varchar(255) NOT NULL DEFAULT '',
  `completed` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `list_id` bigint(20) unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_listId` (`list_id`),
  CONSTRAINT `fk_list_id` FOREIGN KEY (`list_id`) REFERENCES `lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;

INSERT INTO `todos` (`id`, `todo`, `completed`, `list_id`, `created_at`, `update_at`)
VALUES
	(1,'completato esercizio',0,1,'2021-01-01 18:26:58',NULL),
	(2,'Inserire',0,1,'2021-01-01 18:56:46',NULL),
	(3,'Terminato esercizio',0,1,'2021-01-01 18:59:14',NULL);

/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `update_at`)
VALUES
	(1,'Pippo','ppiippo@pippo.com','test','2020-12-31 16:32:38',NULL),
	(2,'Pluto','pluto@pluto.it','test2','2020-12-31 16:33:17',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
