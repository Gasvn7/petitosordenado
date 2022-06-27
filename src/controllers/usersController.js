const db = require('../database/models');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');

const usersController = {

    register: (req, res) => {
        res.render('users/user-register');

    },

    registration: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/user-register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        //* Traer todos los usuarios, si no hay usuarios al primer registrado agregarle userRole = Admin
        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(
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
                        .catch(error => res.send(error))
            )
            .catch(error => res.send(error));
    },

    login: (req, res) => {
        res.render('users/user-login');
    },
    loginProcess: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/user-login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(user => {
                let remember = req.body.remember_user;
                if (user != null) {
                    let passApproved = bcryptjs.compareSync(req.body.password, user.password);
                    if (passApproved) {
                        if (remember) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                        }
                        req.session.userLogged = user;
                        return res.redirect('/')
                    }
                    return res.render('users/user-login', {
                        errors: {
                            password: {
                                msg: 'La contraseña no coincide'
                            }
                        }
                    })
                } else {
                    return res.render('users/user-login', {
                        errors: {
                            email: {
                                msg: 'Este usuario no esta registrado'
                            }
                        }
                    })
                }
            })
    },
    profile: function (req, res) {
        res.render('users/user-profile', {
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
        res.render('users/user-pedidos')
    },
    //! Mostrar la vista direcciones y enviar las direcciones guardadas del usuario
    directions: (req, res) => {
        res.render('users/user-directions')
    },
    //! Mostrar la vista y el formulario para que el usuario pueda modificar sus datos
    details: (req, res) => {
        res.render('users/user-details')
    },

}

module.exports = usersController;