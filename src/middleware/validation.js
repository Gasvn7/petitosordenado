const { body } = require('express-validator');

// Verificando los campos del Registro
module.exports = {
    Registro: [
        body('first_name')
            .notEmpty().withMessage('Escribí un nombre'),
        body('last_name')
            .notEmpty().withMessage('Escribí un apellido'),
        body('email')
            .notEmpty().withMessage('Escribí un email').bail()
            .isEmail().withMessage('Verifica que lo pusiste bien'),
        body('password')
            .notEmpty().withMessage('Escribí una contraseña'),
        /* window.addEventListener('load', e => {

        }) */
    ],
    Login: [
        /* window.addEventListener('load', (e) => {

        }) */
    ]
}