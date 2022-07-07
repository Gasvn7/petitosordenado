const db = require('../../database/models');

const productsAPIController = {
    list: (req, res) => {
        db.Product.findAll({
           /*  include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }] */
        })
            .then((product) => {

                let categoryCount = 1;
                for(let i = 1; i < product.length; i++){
                    if (product[i].category_id != 19){
                        console.log('Me estoy ejecutando')
                        console.log(categoryCount)
                        categoryCount += 1;
                    }
                };
                
                let brandCount = 0;
                for(let i = 1; i < product.length; i++){
                    if(product[i].brand_id != 11){
                        brandCount += 1;
                    }
                };
                
                let sizeCount = 0;
                for(let i = 1; i < product.length; i++){
                    if(product[i].size_id != 5){
                       sizeCount += 1;
                    }
                }

                for (let i = 0; i < product.length; i++){
                    product[i].setDataValue(
                        'ProductDetail',
                        'http://localhost:3500/api/products/' + product[i].id
                    )
                }

                let respuesta = {
                    meta: {
                        count: product.length,
                        categoryCount: categoryCount,
                        brandCount: brandCount,
                        sizeCount: sizeCount
                    },
                    products: product
                }
                res.status(200).json(respuesta)
            })
            /* .catch(e => { res.render(e) }) */
    },
    detail: (req, res) => {
        let productId = req.params.id;
        db.Product.findByPk(productId, {
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        })
            .then((Product) => {
                
                if(Product == null){

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
            /* .catch(e => { res.render(e) }) */
    }
}

module.exports = productsAPIController