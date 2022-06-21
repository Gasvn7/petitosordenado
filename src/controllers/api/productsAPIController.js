const db = require('../../database/models');

const productsAPIController = {
    list: (req, res) => {
        let Producto = db.Product.findAll({
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        });
    
        Promise.all(Producto)
            .then((productoo) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        count: productoo.length,
                        url: '/api/products'
                    },
                    products: productoo
                }
                res.json(respuesta)
            })
            .catch(e => { res.render(e) })
    },
    detail: (req, res) => {
        let productId = req.params.id;
        let Product = db.Product.findByPk(productId, {
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
            // Asi se llaman en los modelos (La relaciones que hicimos, los alias. Ej: Brand = brands)
        });
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();
        let size = db.Size.findAll();

        Promise
            .all([Product, brand, category, size])
            .then(([Product, brand, category, size]) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/products/:id'
                    },
                    data: Product,
                    brand: brand,
                    category: category,
                    size: size,
                    image: Product.image
                }
                res.json(respuesta)
            })
            .catch(e => { res.render(e) })
    }
}

module.exports = productsAPIController