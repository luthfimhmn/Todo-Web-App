const router = require('express').Router();
const todoRoute = require('./todoRoute');
const UserController = require('../controllers/UserController');

router.use('/todos', todoRoute);
router.post('/register', UserController.register);
router.post('/login', UserController.login)

module.exports = router;