const router = require('express').Router();
const TodoController = require('../controllers/TodoController')

router.get('/todos', TodoController.getAllTodo);
router.post('/todos', TodoController.createTodo);
router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.editTodo);
router.patch('/todos/:id', TodoController.updateStatus);
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;