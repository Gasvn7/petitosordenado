const express = require('express');
const router = express.Router();

const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/', productsAPIController.list);
router.get('/categories', productsAPIController.categories);
router.get('/:id', productsAPIController.detail);



module.exports = router;