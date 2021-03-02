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
                throw new Error()
            })
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}

const authorize = (req, res, next) => {
    let todoId = +req.params.id
    Todo.findByPk(todoId)
        .then(todo => {
            if (todo.UserId === req.loggedUser.id) {
                next()
            } else {
                throw new Error()
            }
        })
        .catch(err => {
            res.status(401).json({ message: 'Unauthorized' })
        })
}

module.exports = {
    authenticate,
    authorize
}