const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtPass = process.env.JWT_PASS

const authApi = {
    auth: async(req, res, next) => {
        const authToken = req.headers["authorization"]
        if(authToken != undefined) {
            const bearer = authToken.split(" ")
            const token = bearer[1]
            try {
                const user = await jwt.verify(token, jwtPass)
                if(!user) return res.status(401).json({msg: "token invalid"})
                req.token = token
                req.user = user
                next()
            } catch (error) {
                return res.status(401).json({msg: "token invalid"})
            }
        } else {
                return res.status(401).json({msg: "token invalid"})

        }
    }
}

module.exports = authApi