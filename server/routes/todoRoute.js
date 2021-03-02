const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const { authenticate, authorize } = require('../middlewares/auth');


router.use(authenticate)
router.get('/', TodoController.getAllTodo);
router.post('/', TodoController.createTodo);
router.use('/:id', authorize)
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.editTodo);
router.patch('/:id', TodoController.updateStatus);
router.delete('/:id', TodoController.deleteTodo);


module.exports = router;
