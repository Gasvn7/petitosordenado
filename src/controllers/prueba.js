const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


const pruebaController = {
    mostrar: (req, res) => {
        let Producto = db.Product.findAll({
            include: ['brands']
        });
        let Brand = db.Brand.findAll();

        Promise.all([Producto, Brand])
            .then(([productoo, brandd]) => {
                console.log(productoo);
                console.log(brandd);
                res.json({ data: [productoo, brandd] })
            })
            .catch(e => { res.render(e) })
    }
};

module.exports = pruebaController;