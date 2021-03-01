const router = require('express').Router();
// const userRoute = require('./userRoute');
const TodoController = require('../controllers/TodoController')
const UserController = require('../controllers/UserController');

router.get('/todos', TodoController.getAllTodo);
router.post('/todos', TodoController.createTodo);
router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.editTodo);
router.patch('/todos/:id', TodoController.updateStatus);
router.delete('/todos/:id', TodoController.deleteTodo);
router.post('/register', UserController.register);
router.post('/login', UserController.login)

module.exports = router;