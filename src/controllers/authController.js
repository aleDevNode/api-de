const authDataBase = require('../database/services/authDatabase')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JwtKey = process.env.JWT_PASS
const url = process.env.URI_FRONT_END_PASS
const authController = {
    auth: async (req, res) => {
        try {
            const token = await authDataBase.auth(req.body)
            return res.status(200).json(token)
        } catch (error) {
            return res.status(401).json({error})
        }
    },

    newPassword: async (req,res) =>{
        const {token} = req.params
         const user = await jwt.verify(token, JwtKey)
        return res.render('index',{user,url})


    }
}

module.exports = authController