const { Todo } = require('../models');
class TodoController {
    static getAllTodo(req, res) {
        let UserId = req.loggedUser.id
        Todo.findAll({ where: { UserId } })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static getTodoById(req, res) {
        let id = +req.params.id
        let UserId = req.loggedUser.id
        Todo.findByPk(id)
            .then(data => {
                if (data.UserId === UserId) {
                    res.status(200).json(data)
                } else {
                    throw Error({ message: 'Unauthorized' })
                }
            })
            .catch(err => {
                res.status(404).json({ err })
            })
    }

    static createTodo(req, res) {
        let UserId = req.loggedUser.id
        let { title, description, due_date } = req.body
        Todo.create({ title, description, due_date, UserId })
            .then(data => res.status(201).json(data))
            .catch(err => {
                let detailError = err
                if (detailError.name === 'SequelizeValidationError') {
                    res.status(400).json({ msg: detailError.errors[0].message })
                } else {
                    res.status(500).json({ msg: `Internal Server Error`, detailError: err })
                }
            })
    }

    static editTodo(req, res) {
        let id = +req.params.id
        let { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date }, { where: { id }, returning: true })
            .then(data => res.status(200).json(data[1][0]))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static updateStatus(req, res) {
        let id = +req.params.id
        let { status } = req.body
        Todo.update({ status }, { where: { id }, fields: ['status'], returning: true })
            .then(data => res.status(200).json(data[1][0]))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static deleteTodo(req, res) {
        let id = +req.params.id
        Todo.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({ msg: 'Delete Success' })
            })
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }
}

module.exports = TodoController;