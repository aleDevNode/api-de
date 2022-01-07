const jwt = require('jsonwebtoken')
const mail = require('../email/mail')
const userDataBase = require('../database/services/userDatabase')
require('dotenv').config()
const JwtKey = process.env.JWT_PASS

const url = process.env.URI_FRONT_END_PASS
const usersController = {

    index: async (req, res) => {

     
        try {
            const user = await userDataBase.userList()
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    login: async (req, res) => {
        try {
            const user = await userDataBase.userByLogin(req.query.login)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    show: async (req, res) => {
        try {
            const user = await userDataBase.userById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    search: async (req, res) => {
        try {
            const user = await userDataBase.search(req.query)
            
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    create: async (req, res) => {
        try {

            const {member_id,isUser} = req.body
            if(!isUser) return res.status(400).json({msg:'error registering the user'})
             const user = await userDataBase.userCreate(member_id)
             const usuToken = {
                id: user.id,
                name: user.name,
                email: user.email,
                status:user.status
            }
               const token =  jwt.sign(usuToken,JwtKey,{expiresIn:'48h'})
            if(!token)  throw "token invalid!"
            user.url = url
          mail('login',{user,token},user.email,'DE@DE',"Cadastro de Senha")
        
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