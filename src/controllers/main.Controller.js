const path = require('path');
const db = require('../database/models');






const mainController = {
    header: (req, res) => {
        res.render('./partials/header')
    },
    home: function (req, res) {
        db.Product.findAll({
            limit: 6,
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        })
            .then(producto => {
                res.render('home', { producto: producto })
            })
    },
    carrito: (req, res) => {
        res.render('carrito');
    }
}





module.exports = mainController;