const jwt = require('jsonwebtoken')
const { User } = require('../models');
const { comparePassword } = require('../helpers/password-helper')
const { generateToken } = require('../helpers/jwt-helper');
const { OAuth2Client } = require('google-auth-library');
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

    static loginGoogle(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const googleUserParams = ticket.getPayload();
            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    email: googleUserParams.email,
                    password: (new Date()).toDateString()
                }
            })
                .then(user => {
                    let payload = { id: user[0].id, email: user[0].email }
                    const access_token = generateToken(payload)
                    res.status(200).json({ access_token })
                })
        }
        verify().catch(console.error);
    }
}
module.exports = UserController;