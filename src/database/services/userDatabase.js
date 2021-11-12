const {
    User
} = require('../../models')
const bcrypt = require('bcrypt')
const uuid = require('../../utils/uuid')
module.exports = {

    userList: async () => {
        try {
            const user = await User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
            return user
        } catch (error) {
            throw error
        }
    },
    userByEmail: async (login) => {
        try {
            const user = await User.findOne({
                where:{
                    login
                }
                // attributes: {
                //     exclude: ['password']
                // }
            })
            return user
        } catch (error) {
            throw error
        }
    },
    userCreate: async (user) => {
        try {
           
            const {
                id,
                name,
                email,
                login,
                password
            } = user
            const passwordHash =  bcrypt.hashSync(password,10)
            const userCreate = {
                id:id?id:uuid(),
                name,
                email,
                login,
                password: passwordHash
            }
            const response = await User.create(userCreate)
            return response
        } catch (error) {
            throw error
        }
    },
    userUpdate: async (userParams) => {
        const {
            id,
            name,
            email,
            login,
            password
        } = userParams

        const user = await User.findByPk(id);

        const userUpdate = {
            name: name != '' ? name : user.name,
            email: email != '' ? email : user.email,
            login: login != '' ? login : user.login,
            password: password != '' ? bcrypt.hashSync(password, 10) : user.password,

        }

        const response = await User.update(userUpdate, {
            where: {
                id
            }
        })

        return response
    },
    userDelete: async (id) => {
        console.log(id)
      const response = await User.destroy({
            where: {
                id
            }
        })

        return response
    }

}