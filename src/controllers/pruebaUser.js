const db = require('../database/models');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');


const pruebaUserController = {

    register: (req, res) => {
        res.render('user-register');

    },

    registration: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('user-register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }


        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(user => {
                if (user != null) {
                    return res.render('user-register', {
                        errors: {
                            email: {
                                msg: 'Este email ya está registrado'
                            }
                        },
                        oldData: req.body
                    })
                } else {
                    db.User
                        .create(
                            {
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                email: req.body.email,
                                password: bcryptjs.hashSync(req.body.password, 10),
                                image: req.files[0] != undefined ? req.files[0].filename : 'no-image',
                            }
                        )
                        .then(() => {
                            return res.redirect('/')
                        })
                        .catch(error => res.send(error));
                }
            })
            .catch(error => res.send(error));
    },

    login: (req, res) => {
        res.render('user-login');
    },
    loginProcess: (req, res) => {
        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(user => {
                if (user != null) {
                    if (user.password == req.body.password) {
                        let remember = req.body.remember_user;
                        if (remember) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                        }
                        req.session.userLogged = user;
                        return res.redirect('/')
                    }
                    return res.render('user-login', {
                        errors: {
                            password: {
                                msg: 'La contraseña no coincide'
                            }
                        }
                    })
                } else {
                    return res.render('user-login', {
                        errors: {
                            email: {
                                msg: 'Registrate por favor'
                            },
                            password: {
                                msg: 'Ingresa una contraseña válida'
                            }
                        }
                    })
                }
            })
    },
    profile: function (req, res) {
        res.render('user-profile', {
            user: req.session.userLogged
        });
    },
    logout: function (req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },


    //? LO MENOS IMPORTANTE Y OPCIONAL
    //* Vistas recién creadas y lógica por realizar: 
    //* Pedidos, Direcciones, detailsUpdate
    //! Enviar pedidos o compras realizadas por el usuario y mostrarlas en la vista
    pedidos: (req, res) => {
        res.render('user-pedidos')
    },
    //! Mostrar la vista direcciones y enviar las direcciones guardadas del usuario
    directions: (req, res) => {
        res.render('user-directions')
    },
    //! Mostrar la vista y el formulario para que el usuario pueda modificar sus datos
    details: (req, res) => {
        res.render('user-details')
    },

}

module.exports = pruebaUserController;