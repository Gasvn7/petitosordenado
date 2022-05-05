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
                res.json({ data: [productoo, brandd] })
            })
            .catch(e => { res.render(e) })
    },
    listadodeproductos: (req, res) => {
        db.Product.findAll({
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
        })
            .then(producto => {
                res.render('listado', { producto: producto })
                console.log({ producto: producto })
            })
    },
    detallito: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{ association: 'brands' }, { association: 'sizes' }, { association: 'categories' }]
            // Asi se llaman en los modelos (La relaciones que hicimos, los alias. Ej: Brand = brands)
        })
            .then(producto => {
                res.render('detallito', { producto: producto })
                console.log({ producto: producto })
            })
    },
    /* router.get('/prueba', pruebaController.mostrar);
      router.get('/crear', pruebaController.add);
      router.post('/', uploadFile.any(), pruebaController.crear);
      router.get('/listado', pruebaController.listadodeproductos);
      router.get('/editar/:id', pruebaController.editar);
      router.patch('/editar/:id', uploadFile.any(), pruebaController.actualizar);
      router.delete('/destruir/:id', productController.destruir); */
    add: function (req, res) {
        let brand = db.Brand.findAll();
        let category = db.Category.findAll();

        Promise
            .all([brand, category])
            .then(([brand, category]) => {
                return res.render(path.resolve(__dirname, '..', 'views', 'creando'), { brand, category })
            })
            .catch(error => res.send(error))
    },
    crear: function (req, res) {
        db.Product
            .create(
                {
                    name: req.body.name,
                    price: req.body.price,
                    size_id: req.body.size,
                    quantity: req.body.stock,
                    category_id: req.body.category,
                    brand_id: req.body.brand,
                    /* image: req.file[0].filename, */
                    details: req.body.details
                }
            )
            .then(() => {
                return res.redirect('/')
            })
            .catch(error => res.send(error))
    },
    edit: function (req, res) {
        let movieId = req.params.id;
        let promMovies = Movies.findByPk(movieId, { include: ['genre', 'actors'] });
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        Promise
            .all([promMovies, promGenres, promActors])
            .then(([Movie, allGenres, allActors]) => {
                Movie.release_date = moment(Movie.release_date).format('L');
                return res.render(path.resolve(__dirname, '..', 'views', 'moviesEdit'), { Movie, allGenres, allActors })
            })
            .catch(error => res.send(error))
    },
    update: function (req, res) {
        let movieId = req.params.id;
        Movies
            .update(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                },
                {
                    where: { id: movieId }
                })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))
    },
    delete: function (req, res) {
        let movieId = req.params.id;
        Movies
            .findByPk(movieId)
            .then(Movie => {
                return res.render(path.resolve(__dirname, '..', 'views', 'moviesDelete'), { Movie })
            })
            .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies
            .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))
    }
};

module.exports = pruebaController;