const { User, Member, File } = require("../../models");
const bcrypt = require("bcrypt");
const uuid = require("../../utils/uuid");
const crypto = require("crypto");
const { Op } = require("sequelize");
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
  search: async (query)=>{
    const fieldName = Object.keys(query)[0]
    const value = query[fieldName]

    const user = await User.findOne({
      attributes: {
        exclude: ["password", "updatedAt", "member_id"],
      },
      where: {
       [fieldName]:{
         [Op.like]:`${value}`
       },
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

    return user



  },
  userCreate: async (member_id,status) => {
    try {
      const passRandon = crypto.randomBytes(20);

      const passwordHash = bcrypt.hashSync(passRandon, 10);

      const member = await Member.findByPk(member_id);
      const userCreate = {
        id: uuid(),
        login: member.rf,
        password: passwordHash,
        member_id,
        status,
      };

      const response = await User.create(userCreate);

      const user = {
        ...response.dataValues,
        name: member.full_name,
        email: member.email,
      };

      return user;
    } catch (error) {
      throw error;
    }
  },
  userUpdate: async (userParams) => {
    const { id, password,status } = userParams;
    
    const user = await User.findByPk(id);
    console.log(status)
    const userUpdate = {
      password: password != "" ? bcrypt.hashSync(password, 10) : user.password,
      status,
    };
    const response = await User.update(userUpdate, {
      where: {
        id,
      },
    });
    return response;
  },
  userDelete: async (idBody) => {
   
    const response = await User.destroy({
          where: {
              id:idBody.id
          }
      })

      return response
  }
};
