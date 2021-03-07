const { Todo } = require('../models');
class TodoController {
    static getAllTodo(req, res, next) {
        let UserId = req.loggedUser.id
        Todo.findAll({ where: { UserId }, order: [['id', 'DESC']] })
            .then(data => {
                res.status(200).json({ todos: data, user: req.loggedUser.email })
            })
            .catch(err => {
                next({
                    name: '500'
                })
            })
    }

    static getTodoById(req, res, next) {
        let id = +req.params.id
        let UserId = req.loggedUser.id
        Todo.findByPk(id)
            .then(data => {
                if (data.UserId === UserId) {
                    res.status(200).json(data)
                } else {
                    next({
                        name: '401',
                    })
                }
            })
            .catch(err => {
                next({ name: '500' })
            })
    }

    static createTodo(req, res, next) {
        let UserId = req.loggedUser.id
        let { title, description, due_date } = req.body
        Todo.create({ title, description, due_date, UserId })
            .then(data => res.status(201).json(data))
            .catch(err => {
                next(err)

            })
    }

    static editTodo(req, res, next) {
        let id = +req.params.id
        let { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date }, { where: { id }, returning: true })
            .then(data => res.status(200).json(data[1][0]))
            .catch(err => {
                next(err)
            })
    }

    static updateStatus(req, res, next) {
        let id = +req.params.id
        let { status } = req.body
        Todo.update({ status }, { where: { id }, fields: ['status'], returning: true })
            .then(data => res.status(200).json(data[1][0]))
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo(req, res, next) {
        let id = +req.params.id
        Todo.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({ msg: 'Delete Success' })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController;