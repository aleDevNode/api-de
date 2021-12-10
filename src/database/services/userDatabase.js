const { User, Member, File } = require("../../models");
const bcrypt = require("bcrypt");
const uuid = require("../../utils/uuid");
const crypto = require("crypto");
module.exports = {
  userList: async () => {
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ["password", "updatedAt", "member_id"],
        },
        include: {
          association: "member",
          attributes: ["id", "name", "func"],
          include: {
            association: "file",
            attributes: ["id", "path", "type"],
          },
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  userByLogin: async (login) => {
    try {
      const user = await User.findOne({
        attributes: {
          exclude: ["password", "updatedAt", "member_id"],
        },
        where: {
          login,
        },
        include: {
          model: Member,
          as: "member",
          attributes: {
            exclude: ["createdAt", "updatedAt", "file_id"],
          },
          include: {
            model: File,
            as: "file",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  userById: async (id) => {
    try {
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "updatedAt", "member_id"],
        },
        include: {
          model: Member,
          as: "member",
          attributes: {
            exclude: ["createdAt", "updatedAt", "file_id"],
          },
          include: {
            model: File,
            as: "file",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  // userCreate: async (user) => {
  //     try {
  //        const passRandon = crypto.randomBytes(20)
  //         const {
  //             id,
  //             name,
  //             email,
  //             login,

  //         } = user
  //         const passwordHash =  bcrypt.hashSync(passRandon,10)
  //         const userCreate = {
  //             id:id?id:uuid(),
  //             name,
  //             email,
  //             login,
  //             password: passwordHash
  //         }
  //         const response = await User.create(userCreate)
  //         return response
  //     } catch (error) {
  //         throw error
  //     }
  // },
  // userUpdate: async (userParams) => {
  //     const {
  //         id,
  //         name,
  //         email,
  //         login,
  //         password
  //     } = userParams

  //     const user = await User.findByPk(id);

  //     const userUpdate = {
  //         name: name != '' ? name : user.name,
  //         email: email != '' ? email : user.email,
  //         login: login != '' ? login : user.login,
  //         password: password != '' ? bcrypt.hashSync(password, 10) : user.password,

  //     }

  //     const response = await User.update(userUpdate, {
  //         where: {
  //             id
  //         }
  //     })

  //     return response
  // },
  // userDelete: async (id) => {
  //     console.log(id)
  //   const response = await User.destroy({
  //         where: {
  //             id
  //         }
  //     })

  //     return response
  // }
};
