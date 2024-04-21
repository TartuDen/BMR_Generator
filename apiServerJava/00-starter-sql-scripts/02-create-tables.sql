CREATE
DATABASE  IF NOT EXISTS `bmr_generator_db`;
USE `bmr_generator_db`;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
DROP TABLE IF EXISTS `lab_glassware`;
DROP TABLE IF EXISTS `glass_joint`;

CREATE TABLE `student`
(
    `id`         BIGINT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) DEFAULT NULL,
    `last_name`  VARCHAR(45) DEFAULT NULL,
    `email`      VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



CREATE TABLE lab_glassware
(
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                  VARCHAR(255) NOT NULL,
    material              VARCHAR(255),
    manufacturer          VARCHAR(255),
    location              VARCHAR(255),
    status                VARCHAR(255),
    purchase_date         DATE,
    calibration_date      DATE,
    last_maintenance_date DATE,
    price                 DECIMAL(19, 2),
    provider              VARCHAR(255),
    capacity_ml           INT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE glass_joint
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    type             VARCHAR(50)  NOT NULL,
    size_designation VARCHAR(255) NOT NULL,
    lab_glassware_id BIGINT,
    FOREIGN KEY (lab_glassware_id) REFERENCES lab_glassware (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
