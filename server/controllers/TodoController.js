const { Todo } = require('../models');
class TodoController {
    static getAllTodo(req, res, next) {
        let UserId = req.loggedUser.id
        Todo.findAll({ where: { UserId } })
            .then(data => {
                res.status(200).json({ todos: data })
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
                next({ name: '404' })
            })
    }

    static createTodo(req, res, next) {
        let UserId = req.loggedUser.id
        let { title, description, due_date } = req.body
        Todo.create({ title, description, due_date, UserId })
            .then(data => res.status(201).json(data))
            .catch(err => {
                next(err)
                // let detailError = err
                // if (detailError.name === 'SequelizeValidationError') {
                //     res.status(400).json({ msg: detailError.errors[0].message })
                // } else {
                //     res.status(500).json({ msg: `Internal Server Error`, detailError: err })
                // }
            })
    }

    static editTodo(req, res, next) {
        let id = +req.params.id
        let { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date }, { where: { id }, returning: true })
            .then(data => res.status(200).json(data[1][0]))
            .catch(err => {
                next(err)
                // res.status(500).json({ msg: 'Internal Server Error', detailError: err })
            })
    }

    static updateStatus(req, res, next) {
        let id = +req.params.id
        let { status } = req.body
        Todo.update({ status }, { where: { id }, fields: ['status'], returning: true })
            .then(data => res.status(200).json(data[1][0]))
            .catch(err => {
                next(err)
                // res.status(500).json({ msg: 'Internal Server Error', detailError: err })
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
                // res.status(500).json({ msg: 'Internal Server Error', detailError: err })
            })
    }
}

module.exports = TodoController;