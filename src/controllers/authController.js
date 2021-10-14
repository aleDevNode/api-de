const authDataBase = require('../database/services/authDatabase')
const authController = {
    auth: async (req, res) => {
        try {
            const token = await authDataBase.auth(req.body)
            return res.status(200).json(token)
        } catch (error) {
            return res.status(401).json({error})
        }
    }
}

module.exports = authController