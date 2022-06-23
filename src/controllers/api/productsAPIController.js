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
                let categoryCount = 0;
                let brandCount = 0;
                let sizeCount = 0;

                for(let i = 1; i < products.length; i++){
                    if (products[i].category_id){
                        categoryCount += 1;
                    }
                    if(products[i].brand_id != 11){
                        brandCount += 1;
                    }
                    if(products[i].size_id != 5){
                        sizeCount += 1;
                    }
                }

                for (let i = 0; i < products.length; i++){
                    products[i].setDataValue(
                        'ProductDetail',
                        'http://localhost:3000/api/products/' + products[i].id
                    )
                }

                let respuesta = {
                    meta: {
                        status: 200,
                        brand: brand,
                        category: category,
                        size: size,
                        url: '/api/products/:id'
                    },
                    data: Product,
                    image: Product.image
                }
                res.status(200).json(respuesta)
            })
            .catch(e => { res.render(e) })
    }
}

module.exports = productsAPIController