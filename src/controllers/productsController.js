const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

const productsController = {
    mostrar: (req, res) => {
        let Producto = db.Product.findAll({
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        });
        let Brand = db.Brand.findAll();

        Promise.all([Producto, Brand])
            .then(([productoo, brandd]) => {
                res.json({ data: [productoo, brandd] })
            })
            .catch(e => { res.render(e) })
    },
    listadodeproductos: (req, res) => {
        db.Product.findAll({
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        })
            .then(producto => {
                res.render('products/listado', { producto: producto })
                console.log({ producto: producto })
            })
    },
    listadodeproductos2: (req, res) => {
        db.Product.findAll({
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        })
            .then(producto => {
                res.render('products/listado2', { producto: producto })
                console.log({ producto: producto })
            })
    },
    detallito: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
            // Asi se llaman en los modelos (La relaciones que hicimos, los alias. Ej: Brand = brands)
        })
            .then(producto => {
                res.render('products/detallito', { producto: producto })
            })
    },
    add: function (req, res) {
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();
        let size = db.Size.findAll();

        Promise
            .all([brand, category, size])
            .then(([brand, category, size]) => {
                return res.render('products/creando', { brand, category, size })
            })
            .catch(error => res.send(error))
    },
    crear: function (req, res) {
        // Nombre de Brand - Unico
        /* db.Brand.findOne({ where: { brand: req.body.brand } })
            .then(data => { */
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('products/creando', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            }
            
            let name = req.body.name;
            let details = req.body.details;
            
            if(name != null && name.length >= 5){
                if(details != null && details.length >= 20){
                    db.Product
                            .create(
                                {
                                    name: req.body.name,
                                    price: req.body.price,
                                    quantity: req.body.stock,
                                    size_id: req.body.size,
                                    category_id: req.body.category,
                                    brand_id: req.body.brand,
                                    image: req.files[0] != undefined ? req.files[0].filename : 'no-image',
                                    details: req.body.details
                                }
                            )
                            .then(() => {
                                return res.redirect('/')
                            })
                            .catch(error => res.send(error));
                }
                return res.render('products/creando', {
                    errors: {
                        details: {
                            msg: 'La descripción debe contener al menos 20 caracteres'
                        }
                    },
                    oldData: req.body
                })
            }
            return res.render('products/creando', {
                errors: {
                    name: {
                        msg: 'Ingrese un nombre valido que tenga más de 5 caracteres'
                    }
                },
                oldData: req.body
            })
        
    },
    editar: function (req, res) {
        let productId = req.params.id;
        let Product = db.Product.findByPk(productId, {
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        });
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();
        let size = db.Size.findAll();

        Promise
            .all([Product, brand, category, size])
            .then(([Product, brand, category, size]) => {
                Product.release_date = moment(Product.release_date).format('L');
                return res.render(path.resolve(__dirname, '..', 'views', 'products', 'editando'), { Product, brand, category, size })
            })
            .catch(error => res.send(error))
    },
    actualizar: function (req, res) {
        let productId = req.params.id;
        db.Product
            .update(
                {
                    name: req.body.name,
                    price: req.body.price,
                    size_id: req.body.size,
                    quantity: req.body.stock,
                    category_id: req.body.category,
                    brand_id: req.body.brand,
                    image: req.files[0] != undefined ? req.files[0].filename : db.Product.image,
                    details: req.body.details
                },
                {
                    where: { id: productId }
                })
            .then(() => {
                return res.redirect('/products/listado')
            })
            .catch(error => res.send(error))
    },
    destruir: function (req, res) {
        let productId = req.params.id;
        db.Product
            .destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/products/listado')
            })
            .catch(error => res.send(error))
    }
};

module.exports = productsController;