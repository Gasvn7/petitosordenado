const express = require('express');
const path = require('path');
const router = express.Router();

//* Controller Require *//
/* const userController = require('../controllers/user.Controller.js') */
const pruebaUser = require('../controllers/pruebaUser.js')

//* MIDDLEWARE *//
// Para enviar los errores de validación al usuario
const validation = require('../middleware/validation')

// Para verificar si ya inicio sesión el usuario
const guestMiddleware = require('../middleware/guestMiddleware')

// Para verificar redirigir al login si no inició sesión
const authMiddleware = require('../middleware/authMiddleware')

// MULTER 
const uploadFile = require('../middleware/multerMiddleware')

//* Routes *//

// REGISTRO
router.get('/register', guestMiddleware, pruebaUser.register);
router.post('/', uploadFile.any(), validation, pruebaUser.registration);
// LOGIN
router.get('/login', guestMiddleware, pruebaUser.login);
router.post('/login', pruebaUser.loginProcess);
// PERFIL
router.get('/perfil', authMiddleware, pruebaUser.profile);
// LOGOUT
router.get('/logout', pruebaUser.logout);

// PEDIDOS REALIZADOS POR EL USUARIO
router.get('/pedidos', authMiddleware, pruebaUser.pedidos);
// DIRECCIONES DEL USUARIO
router.get('/direcciones', authMiddleware, pruebaUser.directions);
// DETALLES DE LA CUENTA (VER Y PERSONALIZAR) --- TARJETA, PREFERENCIAS (perros, gatos)
router.get('/detalles', authMiddleware, pruebaUser.details);
/* router.post('/detalles', userController.detailsUpdate); --------------------- POR HACER*/

module.exports = router;