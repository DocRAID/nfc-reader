CREATE TABLE `student_info` (
	`stu_id`	int(10)	NOT NULL,
	`nfc_uid`	varchar(20)	NULL,
	`stu_name`	varchar(5)	NULL
);

CREATE TABLE `attend` (
	`id`	int(10)	NOT NULL,
	`stu_id`	int(10)	NOT NULL,
	`attend_time`	timestamp	NULL,
	`israte`	boolean	NULL
);

ALTER TABLE `student_info` ADD CONSTRAINT `PK_STUDENT_INFO` PRIMARY KEY (
	`stu_id`
);

ALTER TABLE `attend` ADD CONSTRAINT `PK_ATTEND` PRIMARY KEY (
	`id`,
	`stu_id`
);

ALTER TABLE `attend` ADD CONSTRAINT `FK_student_info_TO_attend_1` FOREIGN KEY (
	`stu_id`
)
REFERENCES `student_info` (
	`stu_id`
);
