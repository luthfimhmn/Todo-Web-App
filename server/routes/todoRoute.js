const router = require('express').Router();
const TodoController = require('../controllers/TodoController');

router.get('/', TodoController.getAllTodo);
router.post('/', TodoController.createTodo);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.editTodo);
router.patch('/:id', TodoController.updateStatus);
router.delete('/:id', TodoController.deleteTodo);


module.exports = router;
