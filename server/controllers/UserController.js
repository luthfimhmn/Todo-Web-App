const jwt = require('jsonwebtoken')
const { User } = require('../models');
const { comparePassword } = require('../helpers/password-helper')
const { generateToken } = require('../helpers/jwt-helper');
class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({ email, password })
            .then(user => {
                res.status(201).json({ success: true, message: "user created", user })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    //compare sync password
                    const comparedPassword = comparePassword(password, user.password)
                    if (comparedPassword) {
                        //generate jwt
                        const access_token = generateToken({ id: user.id, email: user.email })
                        res.status(200).json({ access_token })
                    } else {
                        next(err)
                    }
                }
                else {
                    next(err)
                }
            })
            .catch(err => {
                next({
                    name: '500',
                    message: 'Invalid email or password'
                })
            })
    }
}
module.exports = UserController;