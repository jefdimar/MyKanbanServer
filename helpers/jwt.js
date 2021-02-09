const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY)

  return token
}

function checkToken(token) {
  const decoded = jwt.verify(token, SECRET_KEY)

  return decoded
}

module.exports = {
  generateToken,
  checkToken
}