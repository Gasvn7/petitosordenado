-- -----------------------------------------------------
-- Schema petitos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petitos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `petitos` ;

-- -----------------------------------------------------
-- Table `petitos`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petitos`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petitos`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(16) NULL DEFAULT NULL,
  `last_name` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(250) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `userRole` VARCHAR(100) NULL DEFAULT NULL,
  `direction` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petitos`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `status` INT NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `petitos`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petitos`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(25) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petitos`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `size_id` INT NOT NULL,
  `brand_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `details` VARCHAR(100) NULL DEFAULT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Products_Sizes1_idx` (`size_id` ASC) VISIBLE,
  INDEX `fk_Products_Brands1_idx` (`brand_id` ASC) VISIBLE,
  INDEX `fk_Products_Categories1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Brands1`
    FOREIGN KEY (`brand_id`)
    REFERENCES `petitos`.`brands` (`id`),
  CONSTRAINT `fk_Products_Categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `petitos`.`categories` (`id`),
  CONSTRAINT `fk_Products_Sizes1`
    FOREIGN KEY (`size_id`)
    REFERENCES `petitos`.`sizes` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petitos`.`lineorder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petitos`.`lineorder` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `price` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `Line-ordercol` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Line-order_Products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_Line-order_Order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_Line-order_Order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `petitos`.`orders` (`id`),
  CONSTRAINT `fk_Line-order_Products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `petitos`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
