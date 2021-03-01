const { Todo } = require('../models');
class TodoController {
    static getAllTodo(req, res) {
        Todo.findAll()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static createTodo(req, res) {
        let { title, description } = req.body
        Todo.create({ title, description })
            .then(data => res.status(201).json(data))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static editTodo(req, res) {
        let id = +req.params.id
        let { title, description, completeStatus } = req.body
        Todo.update({ title, description, completeStatus }, { where: { id } })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static updateStatus(req, res) {
        let id = +req.params.id
        Todo.update({ completeStatus: true }, { where: { id }, fields: ['completeStatus'] })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }

    static deleteTodo(req, res) {
        let id = +req.params.id
        Todo.destroy({ where: { id } })
            .then(data => {
                return Todo.findAll()
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => res.status(500).json({ msg: 'Internal Server Error', detailError: err }))
    }
}

module.exports = TodoController;