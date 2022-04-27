--- CREATING DATABASE ---
CREATE DATABASE petitos;
--- CREATING TABLES ---
--- Follow the order please
--- 1. Sizes
CREATE TABLE IF NOT EXISTS `petitos`.`size` (
  `id` INT NOT NULL,
  `size` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
--- 2. Brands
CREATE TABLE IF NOT EXISTS `petitos`.`brand` (
  `id` INT NOT NULL,
  `brand` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
--- 3. Categories
CREATE TABLE IF NOT EXISTS `petitos`.`category` (
  `id` INT NOT NULL,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
--- 4. Creating Products
CREATE TABLE IF NOT EXISTS `petitos`.`product` (
  `id` INT NOT NULL,
  `size_id` INT NOT NULL,
  `brand_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `details` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idProductos_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Products_Sizes1_idx` (`size_id` ASC) VISIBLE,
  INDEX `fk_Products_Brands1_idx` (`brand_id` ASC) VISIBLE,
  INDEX `fk_Products_Categories1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_Products_Brands1`
    FOREIGN KEY (`brand_id`)
    REFERENCES `petitos`.`brand` (`id`),
  CONSTRAINT `fk_Products_Categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `petitos`.`category` (`id`),
  CONSTRAINT `fk_Products_Sizes1`
    FOREIGN KEY (`size_id`)
    REFERENCES `petitos`.`size` (`id`));
--- 5. Creating User
CREATE TABLE IF NOT EXISTS `petitos`.`user` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(16) NULL DEFAULT NULL,
  `last_name` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(32) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `userRole` VARCHAR(45) NULL DEFAULT NULL,
  `direction` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  --- 6. Order
CREATE TABLE IF NOT EXISTS `petitos`.`order` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `status` INT NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `petitos`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    --- 7. LineOrder
CREATE TABLE IF NOT EXISTS `petitos`.`lineOrder` (
  `id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `price` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `Line-ordercol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Line-order_Products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_Line-order_Order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_Line-order_Order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `petitos`.`order` (`id`),
  CONSTRAINT `fk_Line-order_Products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `petitos`.`product` (`id`));