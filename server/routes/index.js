const router = require('express').Router();
const TodoController = require('../controllers/TodoController')

router.get('/todos', TodoController.getAllTodo);
router.post('/todos/add', TodoController.createTodo);
router.put('/todos/:id/edit', TodoController.editTodo);
router.patch('/todos/:id/complete', TodoController.updateStatus);
router.delete('/todos/:id/delete', TodoController.deleteTodo);

module.exports = router;