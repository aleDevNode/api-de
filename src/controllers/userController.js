
const jwt = require('jsonwebtoken')
const mail = require('../email/mail')
const userDataBase = require('../database/services/userDatabase')

const usersController = {

    index: async (req, res) => {
        try {

            const user = await userDataBase.userList()

          
            
            res.status(200).json(user)

        } catch (error) {

            res.status(400).json(error)
        }
    },
    create: async (req, res) => {
        try {
            const user = await userDataBase.userCreate(req.body)
            
          mail('login',{user},user.email,'DE@DE',"Cadastro de Senha")
            res.status(201).json(user)

        } catch (error) {

            res.status(400).json(error)
        }
    },
    update: async (req, res) => {
        try {

             const user = await userDataBase.userUpdate(req.body)

            return res.status(200).json(user)

        } catch (error) {

            return res.status(400).json(error)
        }
    },
    delete: async (req, res) => {
        try {
            const {
                id
            } = req.body

            const user = await userDataBase.userDelete(id)

            return res.status(200).json(user)

        } catch (error) {

            return res.status(400).json(error)

        }

    }


}

module.exports = usersController;