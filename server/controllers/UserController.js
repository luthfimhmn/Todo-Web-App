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
                        next({ msg: 'Invalid email or password' })
                    }
                } else {
                    next({ msg: 'Invalid email or password' })
                }
            })
            .catch(err => {
                // console.log(err);
                // let errorMessage;
                // if (err.msg) errorMessage = err.msg
                // else errorMessage = err.errors[0].message || "Internal Server Error"

                // res.status(500).json({ message: errorMessage })
                next(err)
            })
    }
}
module.exports = UserController;