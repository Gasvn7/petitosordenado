/* const User = require('../models/User') */
const db = require('../database/models');
//! TODO SE ROMPIÓ CON ESTE CODIGO. REVISIÓN AAAAAAAAAAA AAAAAAA
//! REVISIÓN AAAAAAAAAA 
function userLoggedMiddleware(req, res, next) {
    /*  let userFromCookie = User.findByField('email', emailInCookie); */
    /* let emailInCookie = req.cookies.userEmail; */

    if (req.cookies.userEmail) {
        let emailInCookie = req.cookies.userEmail;

        db.User.findOne({
            where: { email: emailInCookie }
        })
            .then(userCookie => {
                res.locals.isLogged = false;
                if (userCookie != null) {
                    req.session.userLogged = userCookie
                }
                if (req.session.userLogged) {
                    res.locals.isLogged = true;
                    res.locals.userLogged = req.session.userLogged;
                }
            })
            .then(next())
    }


    /*  if (userFromCookie) {
         req.session.userLogged = userFromCookie;
     }
 
     if (req.session.userLogged) {
         res.locals.isLogged = true;
         res.locals.userLogged = req.session.userLogged;
     } */

}

module.exports = userLoggedMiddleware