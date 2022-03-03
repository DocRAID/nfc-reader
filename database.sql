
CREATE DATABASE IF NOT EXISTS `nfc` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `nfc`;

-- 테이블 nfc.admin_login 구조 내보내기
CREATE TABLE IF NOT EXISTS `admin_login` (
  `id` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DELETE FROM `admin_login`;

CREATE TABLE IF NOT EXISTS `attend` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `stu_id` int(10) DEFAULT 0,
  `israte` char(4) DEFAULT NULL,
  `attend_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

DELETE FROM `attend`;

CREATE TABLE IF NOT EXISTS `student_info` (
  `stu_id` int(10) DEFAULT NULL,
  `stu_name` varchar(5) DEFAULT NULL,
  `nfc_uid` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DELETE FROM `student_info`;
