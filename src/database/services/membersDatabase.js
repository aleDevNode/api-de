const { Member, File } = require("../../models");
const { Op } = require("sequelize");
const { v4: uuid } = require("uuid");
const memberDatabase = {
  findAll: async (queryParams) => {
    const { page = 1 } = queryParams;
    const limit = 10;
    const offset = page < 1 ? 0 : (page - 1) * limit;
    const { count: total, rows: members } = await Member.findAndCountAll({
      offset: parseInt(offset),
      limit,
      attributes: {
        exclude: ["updatedAt"],
      },
      include: {
        model: File,
        as: "file",
        required: true,
        attributes: {
          exclude: ["createdAt", "updatedAt", "file_id"],
        },
      },
      order: [["full_name", "ASC"]],
    });
    return { total, members };
  },

  show: async (params) => {
    const { id } = params;
    try {
      const member = await Member.findByPk(id, {
        attributes: {
          exclude: ["updatedAt"],
        },
        include: {
          model: File,
          as: "file",
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt", "file_id"],
          },
        },
      });
      return member;
    } catch (error) {
      throw "Erro in search member ->" + error;
    }
  },
  time: async () => {
    try {
      const members = await Member.findAll({
        where: {
          time: true,
        },
        attributes: {
          exclude: ["updatedAt", "file_id"],
        },
        include: {
          model: File,
          as: "file",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      return members;
    } catch (error) {}
    throw "Erro in search time" + error;
  },
  create: async (body) => {
    const {name,func,birth,rf,full_name, email,cellphone,description,time,location,status,path,type} = body;

    const file = {
      id: uuid(),
      path,
      type,
    };
    const {id} = await File.create(file)
    const memberCreate = {
      id: uuid(),
      name,
      func,
      birth,
      rf,
      full_name,
      email,
      cellphone,
      description,
      time,
      location,
      file_id:id,
      status,
    };
    const member = await Member.create(memberCreate)
    return member;
  },
};

module.exports = memberDatabase;
