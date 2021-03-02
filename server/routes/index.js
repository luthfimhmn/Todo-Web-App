const router = require('express').Router();
const todoRoute = require('./todoRoute');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login)
router.use('/todos', todoRoute);

module.exports = router;