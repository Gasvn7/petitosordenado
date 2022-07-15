const db = require('../../database/models');

const productsAPIController = {
    categories: (req, res) => {
        db.Category.findAll({
            include: [{
                model: db.Product,
                as: 'products',
                required: false,
            }],
        })
            .then((categorias) => {
                let resultado = categorias.map(registro => {
                    let objeto = {
                        id: registro.id,
                        category: registro.category,
                        cant: registro.products.length
                    }
                    return objeto;

                });


                res.status(200).json(resultado)
            })
    
        /*db.Category.findAll()
        .then(categories=>{
            let respuesta = {
                count: categories.length,
                categories: categories
            }

            res.status(200).json(respuesta)
        })
        //! Intento de resolver sprint8 dashboard: Mostrar las categorías con cuantos productos hay en las mismas.
        /* let product = db.Product.findAll({
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        });
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();
        let size = db.Size.findAll();

        Promise
            .all([product, brand, category, size])
            .then(([product, brand, category, size]) => {
                let categoryCount = []
                product.map((prod)=>{
                    categoryCount.push(prod.category_id)
                })
                
                console.log(categoryCount)
            })
            .catch(error => res.send(error)) */

    },
    categoriescont:(req,res)=>{
    db.Category.findAll()
        .then(categories=>{
            let respuesta = {
                count: categories.length,
                categories: categories
            }

            res.status(200).json(respuesta)
        })
    },
    list: (req, res) => {
        db.Product.findAll({
            /*  include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }] */
        })
            .then((product) => {

                let categoryCount = 1;
                for (let i = 1; i < product.length; i++) {
                    if (product[i].category_id != 19) {
                        categoryCount += 1;
                    }
                };

                let brandCount = 0;
                for (let i = 1; i < product.length; i++) {
                    if (product[i].brand_id != 11) {
                        brandCount += 1;
                    }
                };

                let sizeCount = 0;
                for (let i = 1; i < product.length; i++) {
                    if (product[i].size_id != 5) {
                        sizeCount += 1;
                    }
                }

                for (let i = 0; i < product.length; i++) {
                    product[i].setDataValue(
                        'ProductDetail',
                        'http://localhost:3500/api/products/' + product[i].id
                    )
                }

                let respuesta = {
                    count: product.length,
                    categoryCount: categoryCount,
                    brandCount: brandCount,
                    sizeCount: sizeCount,
                    products: product
                }
                res.status(200).json(respuesta)
            })
            .catch(e => { res.render(e) })
    },
    detail: (req, res) => {
        let productId = req.params.id;
        db.Product.findByPk(productId, {
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        })
            .then((Product) => {

                if (Product == null) {

                    res.status(200).json({
                        NonExistent: 'El producto no existe en la base de datos'
                    })

                } else {
                    Product.setDataValue(
                        'image',
                        'http://localhost:3500/api/usersImages/' + Product.image
                    )

                    let respuesta = {
                        id: Product.id,
                        data: Product
                    }

                    res.status(200).json(respuesta)
                }

            })
            .catch(e => { res.render(e) })
    }
}

module.exports = productsAPIController