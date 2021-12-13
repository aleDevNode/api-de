const { Member, File, User } = require("../../models");
const fs = require('fs');
const path = require('path')
const { Op } = require("sequelize");
const { v4: uuid } = require("uuid");
const avatar = require("../../middlewares/avatar");
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
    const {
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
      status,
      path,
      file_name,
      type,
    } = body;

    const file = {
      id: uuid(),
      path,
      file_name,
      type,
    };
    const { id } = await File.create(file);
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
      file_id: id,
      status,
    };
    const member = await Member.create(memberCreate);
    return member;
  },
  update: async (body) => {
    const { id } = body;
    const member = await Member.findByPk(id, {
      attributes: {
        exclude: ["id,createdAt", "updatedAt"],
      },
    });

    const memberUpdadte = {
      name: body.name === "" ? member.name : body.name,
      func: body.func === "" ? member.func : body.func,
      birth: body.birth === "" ? member.birth : body.birth,
      rf: body.rf === "" ? member.rf : body.rf,
      full_name: body.full_name === "" ? member.full_name : body.full_name,
      email: body.email === "" ? member.email : body.email,
      cellphone: body.cellphone === "" ? member.cellphone : body.cellphone,
      description:
        body.description === "" ? member.description : body.description,
      time: body.time === "" ? member.time : body.time,
      location: body.location === "" ? member.location : body.location,
      status: body.status === "" ? member.status : body.status,
    };
    const response = await Member.update(memberUpdadte, {
      where: {
        id,
      },
    });
    return response;
  },
  delete: async (body) => {
    const { id } = body;
    console.log(id);
    const member = await Member.findByPk(id, {
      attributes: ["file_id"],
      include: {
        model: User,
        as: "user",
        attributes: ["id"],
      },
    });

    const {user,file_id} = member
    
    const {file_name} = await File.findByPk(file_id)
    
 
    if(user) {
    await  User.destroy({
        where:{
          id:user.id
        }
      })
    }

    const response = await Member.destroy({
      where:{
        id
      },
    })
    if(file_name){
      fs.unlink( path.resolve('src','public','uploads','avatar',file_name),(err)=>{
        if(err) throw err;
        console.log('Arquivo deletado da pasta');
      })
    }
    await File.destroy({
      where:{
        id:file_id
      }
    })
    return response;
  },
};

module.exports = memberDatabase;
