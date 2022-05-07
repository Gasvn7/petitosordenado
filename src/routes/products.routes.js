const express = require('express');
const path = require('path');
const router = express.Router();

// Controller Require //
const productController = require('../controllers/product.Controller.js')
const pruebaController = require('../controllers/prueba.js')
// MULTER
const uploadFile = require('../middleware/multerMiddleware')

//! CRUD db
router.get('/prueba', pruebaController.mostrar); //? Devuelve un JSON
router.get('/crear', pruebaController.add);
router.post('/', uploadFile.any(), pruebaController.crear);
router.get('/listado', pruebaController.listadodeproductos);
router.get('/editar/:id', pruebaController.editar);
router.patch('/editar/:id', uploadFile.any(), pruebaController.actualizar);
router.delete('/destruir/:id', pruebaController.destruir);
router.get('/prueba/:id', pruebaController.detallito);
//! CRUD db


//? CRUD json
//*1. Listado de productos*//
/* router.get('/list', productController.showPrdcts);
router.delete('/list/delete/:id', productController.list_destroy); */

//*2. Formulario de creación de productos*//
/* router.get('/create', productController.create); */

//*4. Acción de creación (a donde se envía el formulario*//
/* router.post('/', uploadFile.any(), productController.store); */

//*5. Formulario de edición de productos*//
/* router.get('/edit/:id', productController.edit); */

//*6. Acción de edición (a donde se envía el formulario*//
/* router.patch('/edit/:id', uploadFile.any(), productController.update); */

//*7. Acción de borrado*//
/* router.delete('/delete/:id', productController.destroy); */

//*3. Detalle de un producto particular*//
/* router.get('/:id', productController.details); */









module.exports = router;
