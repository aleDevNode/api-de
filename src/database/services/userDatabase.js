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
  userCreate: async (member_id) => {
    try {
      const passRandon = crypto.randomBytes(20);

      const passwordHash = bcrypt.hashSync(passRandon, 10);

      const member = await Member.findByPk(member_id);
      const userCreate = {
        id: uuid(),
        login: member.rf,
        password: passwordHash,
        member_id,
        status: true,
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
    const { id, password } = userParams;
    const user = await User.findByPk(id);
    const userUpdate = {
      password: password != "" ? bcrypt.hashSync(password, 10) : user.password,
    };
    const response = await User.update(userUpdate, {
      where: {
        id,
      },
    });
    return response;
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
};
