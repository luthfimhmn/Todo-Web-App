const { verifyToken } = require('../helpers/jwt-helper')
const { User, Todo } = require('../models');

const authenticate = (req, res, next) => {
    try {
        let { id, email } = verifyToken(req.headers.access_token)
        User.findOne({
            where: { id, email }
        })
            .then(user => {
                req.loggedUser = { id: user.id, email: user.email }
                next()
            })
            .catch(err => {
                next({
                    name: '401'
                })
            })
    } catch (error) {
        next({
            name: '401'
        })
    }
}

const authorize = (req, res, next) => {
    let todoId = +req.params.id
    Todo.findByPk(todoId)
        .then(todo => {
            if (todo.UserId === req.loggedUser.id) {
                next()
            } else {
                next({
                    name: '401'
                })
            }
        })
        .catch(err => {
            next({
                name: '401'
            })
        })
}

module.exports = {
    authenticate,
    authorize
}