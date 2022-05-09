const express = require('express');
const router = express.Router();

// Controller Require //
const pruebaController = require('../controllers/prueba.js')
// MULTER
const uploadFile = require('../middleware/multerMiddleware')

//! CRUD db
router.get('/', pruebaController.mostrar); //? Devuelve un JSON

//* Creación de producto - VISTA
router.get('/crear', pruebaController.add);

//* Creación de producto - POST
router.post('/', uploadFile.any(), pruebaController.crear);

//* Listado de productos - VISTA
router.get('/listado', pruebaController.listadodeproductos);

//* Editar producto - VISTA
router.get('/editar/:id', pruebaController.editar);

//* Editar producto - PATCH
router.patch('/editar/:id', uploadFile.any(), pruebaController.actualizar);

//* Destruir producto - DELETE
router.delete('/destruir/:id', pruebaController.destruir);

//* Detalle de producto - VISTA
router.get('/prueba/:id', pruebaController.detallito);
//! CRUD db


module.exports = router;
