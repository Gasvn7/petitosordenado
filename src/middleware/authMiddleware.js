function authMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }
    next();
}
// Redirigiendo al que Ingrese si intenta entrar en Perfil
module.exports = authMiddleware