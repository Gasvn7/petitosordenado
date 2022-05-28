const { check } = require('express-validator');

// Verificando los campos del Registro
module.exports = {
    Registro: [
        check('first_name')
            .notEmpty().withMessage('Escribí un nombre'),
        check('last_name')
            .notEmpty().withMessage('Escribí un apellido'),
        check('email')
            .notEmpty().withMessage('Escribí un email').bail()
            .isEmail().withMessage('Verifica que lo pusiste bien'),
        check('password')
            .notEmpty().withMessage('Escribí una contraseña'),
    ],
    Login: [

    ],
    Creacion: [
        check('name')
        .notEmpty().withMessage('Este campo tiene que estar completado')
        .isLength(min=5).withMessage('Debe tener al menos 5 caracteres'),
        check('price')
            .notEmpty().withMessage('Este campo tiene que estar completado')
            .isNumeric().withMessage('Solo debe contener números'),
        check('stock')
            .notEmpty().withMessage('Este campo tiene que estar completado')
            .isNumeric().withMessage('Solo debe contener números'),
        check('details')
        .notEmpty().withMessage('Este campo tiene que estar completado')
        .isLength(min=20).withMessage('Debe tener al menos 20 caracteres'),
    ],

    Editando: [
        check('name')
        .notEmpty().withMessage('Este campo tiene que estar completado')
        .isLength(min=5).withMessage('Debe tener al menos 5 caracteres'),
        check('price')
            .notEmpty().withMessage('Este campo tiene que estar completado')
            .isNumeric().withMessage('Solo debe contener números'),
        check('stock')
            .notEmpty().withMessage('Este campo tiene que estar completado')
            .isNumeric().withMessage('Solo debe contener números'),
        check('details')
        .notEmpty().withMessage('Este campo tiene que estar completado')
        .isLength(min=20).withMessage('Debe tener al menos 20 caracteres'),
    ]
}