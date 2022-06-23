const db = require('../../database/models');

const usersAPIController = {
    list: (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email']
        })
            .then((users) => {
                for(let i = 0; i < users.length; i++){
                    users[i].setDataValue('detail', 'http://localhost:3500/api/users/profile/' + users[i].id)
                }

                let respuesta = {
                        count: users.length,
                        user: users
                }

                res.status(200).json(respuesta)
            })
            .catch(e => { res.render(e) })
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then((user) => {
                let respuesta = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    image: 'http://localhost:3500/api/usersImages/' + user.image
                }

                res.status(200).json(respuesta)
            })
            .catch(e => { res.render(e)})
    }
}

module.exports = usersAPIController