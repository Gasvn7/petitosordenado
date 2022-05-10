-- Filling with stuff the database

-- Rellear tabla - Brands
-- Perros
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('1', 'Royal Canin - Perro');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('2', 'Prop Plan - Perro');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('3', 'Eukanuba');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('4', 'Excellent - Perro');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('5', 'Dog Chow');
-- Gatos
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('6', 'Royal Canin - Gato');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('7', 'Prop Plan - Gato');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('8', 'Nutrique');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('9', 'Excellent - Gato');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('10', 'Cat Chow');
INSERT INTO `petitos`.`brands` (`id`, `brand`) VALUES ('11', 'Sin marca');

-- Rellenar tabla - Categories
-- Alimento
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('1', 'Alimento para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('2', 'Alimento para gatos');
-- Juguetes
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('3', 'Juguetes para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('4', 'Juguetes para gatos');
-- Ropa
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('5', 'Ropa para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('6', 'Ropa para gatos');
-- Camas
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('7', 'Camas para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('8', 'Camas para gatos');
-- Higiene
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('9', 'Higiene para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('10', 'Higiene para gatos');
-- Estética
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('11', 'Estética para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('12', 'Estética para gatos');
-- Accesorios
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('13', 'Accesorios para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('14', 'Accesorios para gatos');
-- Collares
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('15', 'Collares para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('16', 'Collares para gatos');
-- Comederos y bebederos
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('17', 'Comederos y bebederos para perros');
INSERT INTO `petitos`.`categories` (`id`, `category`) VALUES ('18', 'Comederos y bebederos para gatos');

-- Rellenar tabla - Sizes
INSERT INTO `petitos`.`sizes` (`id`, `size`) VALUES ('1', 'Pequeño');
INSERT INTO `petitos`.`sizes` (`id`, `size`) VALUES ('2', 'Mediano');
INSERT INTO `petitos`.`sizes` (`id`, `size`) VALUES ('3', 'Grande');
INSERT INTO `petitos`.`sizes` (`id`, `size`) VALUES ('4', 'Muy Grande');
INSERT INTO `petitos`.`sizes` (`id`, `size`) VALUES ('5', 'No tiene');

-- Rellenar tabla - Products
-- Producto 1
INSERT INTO `petitos`.`products` (`id`, `size_id`, `brand_id`, `category_id`, `name`, `price`, `quantity`, `details`) 
VALUES ('1', '5', '1', '1', 'Alimento Royal Canin para Perro Vegano', '600', '50', 'Alimento bonito y rico para tu perrito bonito y chikito');
-- Producto 2
INSERT INTO `petitos`.`products` (`id`, `size_id`, `brand_id`, `category_id`, `name`, `price`, `quantity`, `details`) 
VALUES ('2', '5', '6', '2', 'Alimento Royal Canin para Gato Vegano', '600', '50', 'Alimento bonito y rico para tu gatito bonito y chikito');
-- Producto 3
INSERT INTO `petitos`.`products` (`id`, `size_id`, `brand_id`, `category_id`, `name`, `price`, `quantity`, `details`) 
VALUES ('3', '5', '11', '3', 'Peluche de Goku anti-estres', '166', '15', 'Peluche anti-estres con diseño de Goku de serie famosa china');
-- Producto 4
INSERT INTO `petitos`.`products` (`id`, `size_id`, `brand_id`, `category_id`, `name`, `price`, `quantity`, `details`) 
VALUES ('4', '5', '11', '4', 'Peluche de Vegeta anti-estres', '166', '15', 'Peluche anti-estres con diseño de Vegeta de serie famosa turca');
-- Producto 5
INSERT INTO `petitos`.`products` (`id`, `size_id`, `brand_id`, `category_id`, `name`, `price`, `quantity`, `details`) 
VALUES ('5', '2', '11', '5', 'Camisa de leñador', '375', '30', 'Camisa de leñador para perrito fachera, fecherita para tu perro leñador');
-- Producto 6
INSERT INTO `petitos`.`products` (`id`, `size_id`, `brand_id`, `category_id`, `name`, `price`, `quantity`, `details`) 
VALUES ('6', '1', '11', '6', 'Remera de Hello Kitty', '1000', '50', 'Remera de Hello Kitty para tu gatito aesthetic');

-- Rellenar tabla - Users
-- Admin 1
INSERT INTO `petitos`.`users` (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `userRole`) 
VALUES ('1', 'Primer', 'Admin', 'elprimeradmin555@gmail.com', 'adminadminadmin3', 'no-image', 'Admin');
-- Usuario Ejemplo
INSERT INTO `petitos`.`users` (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `userRole`) 
VALUES ('2', 'Usuario', 'Ejemplo', 'usamecomoejemplo@gmail.com', 'soyunejemploejemplar', 'no-image', 'Client');
