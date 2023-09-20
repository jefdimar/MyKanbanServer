const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController {
  static register(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(input)
      .then(user => {
        const data = {
          id: user.id,
          email: user.email
        }

        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: input.email
      }
    })
      .then(user => {
        if (!user) {
          next({
            name: 'Username / Password wrong'
          })
        } else {
          const match = checkPassword(input.password, user.password)

          if (match) {
            const payload = {
              id: user.id,
              email: user.email
            }

            const access_token = generateToken(payload)

            res.status(200).json({ access_token })
          } else {
            next({
              name: 'Username / Password wrong'
            })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
// this is google login
  static googleLogin(req, res, next) {
    const id_token = req.body.id_token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let email = ""

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email

        return User.findOne({
          where: { email }
        })
      })
      .then(user => {
        if (!user) {
          return User.create({
            email,
            password: 'googlepassword'
          })
        } else {
          return user
        }
      })
      .then(user => {
        const payload = {
          id: user.id,
          email: user.email
        }

        const access_token = generateToken(payload)
        
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController;