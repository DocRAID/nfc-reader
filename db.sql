CREATE TABLE IF NOT EXISTS `attend` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `stu_id` int(10) DEFAULT 0,
  `israte` char(4) DEFAULT NULL,
  `attend_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `student_info` (
  `stu_id` int(10) DEFAULT NULL,
  `stu_name` varchar(5) DEFAULT NULL,
  `nfc_uid` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;