const express = require('express');
const router = express.Router();

// Controller Require //
const productsController = require('../controllers/productsController.js')
// MULTER
const uploadFile = require('../middleware/multerMiddleware')
// Para verificar redirigir al login si no inició sesión
const authMiddleware = require('../middleware/authMiddleware')
const { Creacion, Editando } = require('../middleware/validation');

//! CRUD db
router.get('/', productsController.mostrar); //? Devuelve un JSON

//* Creación de producto - VISTA
router.get('/crear', authMiddleware, productsController.add);

//* Creación de producto - POST
router.post('/', uploadFile.any(), Creacion ,productsController.crear);

//* Listado de productos - VISTA
router.get('/listado', productsController.listadodeproductos);
router.get('/listado2', productsController.listadodeproductos2);

//* Editar producto - VISTA
router.get('/editar/:id', authMiddleware, productsController.editar);

//* Editar producto - PATCH
router.patch('/editar/:id', uploadFile.any(),  Editando, productsController.actualizar);

//* Destruir producto - DELETE
router.delete('/destruir/:id', authMiddleware, productsController.destruir);

//* Detalle de producto - VISTA
router.get('/detalle/:id', productsController.detallito);
//! CRUD db


module.exports = router;
