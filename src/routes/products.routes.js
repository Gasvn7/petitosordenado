const express = require('express');
const router = express.Router();

// Controller Require //
const pruebaController = require('../controllers/prueba.js')
// MULTER
const uploadFile = require('../middleware/multerMiddleware')
// Para verificar redirigir al login si no inició sesión
const authMiddleware = require('../middleware/authMiddleware')

//! CRUD db
router.get('/', pruebaController.mostrar); //? Devuelve un JSON

//* Creación de producto - VISTA
router.get('/crear', authMiddleware, pruebaController.add);

//* Creación de producto - POST
router.post('/', uploadFile.any(), pruebaController.crear);

//* Listado de productos - VISTA
router.get('/listado', pruebaController.listadodeproductos);
router.get('/listado2', pruebaController.listadodeproductos2);

//* Editar producto - VISTA
router.get('/editar/:id', authMiddleware, pruebaController.editar);

//* Editar producto - PATCH
router.patch('/editar/:id', uploadFile.any(), pruebaController.actualizar);

//* Destruir producto - DELETE
router.delete('/destruir/:id', authMiddleware, pruebaController.destruir);

//* Detalle de producto - VISTA
router.get('/detalle/:id', pruebaController.detallito);
//! CRUD db


module.exports = router;
