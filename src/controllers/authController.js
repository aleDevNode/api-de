const userDataBase = require('../database/services/userDatabase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JwtKey = process.env.JWT_PASS
const authController = {

    auth: async (req, res) => {
        try {
            const {
                login,
                password
            } = req.body

            const user = await userDataBase.userByEmail(login)
         
            if (!user) return res.status(401).json({
                msg: "User or Password invalid! USER"
            });
            if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({
                msg: "User or Password invalid! PASS"
            });

            const usuToken = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = await jwt.sign(usuToken,JwtKey,{expiresIn:'8h'})

            return res.status(200).json({token})


        } catch (error) {

            return res.status(401).json({
                error
            })
        }
    }
}

module.exports = authController