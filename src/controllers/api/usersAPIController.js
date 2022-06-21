const db = require('../../database/models');

const usersAPIController = {
    list: (req, res) => {
        db.User.findAll()
            .then((users) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        count: users.length,
                        url: '/api/users'
                    },
                    user: users
                }

                res.json(respuesta)
            })
            .catch(e => { res.render(e) })
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then((user) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/users/:id'
                    },
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    image: user.image
                }

                res.json(respuesta)
            })
            .catch(e => { res.render(e)})
    }
}

module.exports = usersAPIController