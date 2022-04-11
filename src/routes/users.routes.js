const express = require('express');
const path = require('path');
const router = express.Router();

//* Controller Require *//
const userController = require('../controllers/user.Controller.js')

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
router.get('/register', guestMiddleware, userController.register);
router.post('/', uploadFile.any(), validation, userController.registration);

// LOGIN
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess);

// PERFIL
router.get('/perfil/', authMiddleware, userController.profile);

// LOGOUT
router.post('/logout', userController.logout);

module.exports = router;