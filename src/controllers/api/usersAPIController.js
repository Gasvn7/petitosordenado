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
                if(user == null){

                    res.status(200).json({
                       NonExistent: 'El usuario no existe en la base de datos'
                    })

                } else {
                    
                    let respuesta = {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        image: 'http://localhost:3500/api/usersImages/' + user.image,
                        created_at: user.created_at
                    }
    
                    res.status(200).json(respuesta)
                }
                
            })
            .catch(e => { res.render(e)})
    },
    new: (req,res) => {
        db.User.findOne({
            order:[['updated_at','DESC']]
        })
        .then((users) => {

            res.status(200).json(users)
        })
        .catch(e => { res.render(e) })
    }
}

module.exports = usersAPIController