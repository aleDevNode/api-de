const {
    User
} = require('../../models')
const bcrypt = require('bcrypt')
const userDatabase = require('./userDatabase')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JwtKey = process.env.JWT_PASS

module.exports = {
    auth: async (body) =>{
        const {
            login,
            password
        } = body
        const user = await userDatabase.userByEmail(login)
        if (!user) throw "User or Password invalid! USER"
        if (!bcrypt.compareSync(password, user.password)) throw "User or Password invalid! PASS"
        const usuToken = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        const token = await jwt.sign(usuToken,JwtKey,{expiresIn:'8h'})
        if(!token)  throw "token invalid!"
        return {token}
  }
}