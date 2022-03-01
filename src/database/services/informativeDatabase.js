const { Informative, File } = require("../../models");
const uuid = require("../../utils/uuid");
const path = require('path')
const fs = require('fs')
require("dotenv").config();
const InformativeDatabase = {
  find: async () => {
    const informative = await Informative.findAll({
      attributes: ["id", "title", "description","created_at"],
      include: {
        model: File,
        as: "file",
        attributes: ["id", "path"],
      },
      order: [
        ['createdAt', 'DESC']
    ]
    });
    return informative;
  },
  create: async (body) =>{
    try {
      const {informative,file} = body
      const fileCreate = {
        id:uuid(),
       path:`${process.env.URI_END_POINT}/uploads/files/${file.filename}`,
       file_name:file.filename,
       type:file.mimetype
      }
      const informativeCreate = {
        id:uuid(),
        title:informative.title,
        description:informative.description,
        file_id:fileCreate.id
      }
      const responseFile = await File.create(fileCreate)
      const responseInformative = await Informative.create(informativeCreate)
    // return {fileCreate}
      return {responseFile,responseInformative}
    } catch (error) {
      throw error.message
    }
  },
  update: async (body) =>{
    try {
      return body
    } catch (error) {
      throw error.message
    }
  },
  delete: async (id) =>{
    try {
      const informative = await Informative.findByPk(id,{
        include: {
          model: File,
          as: "file",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      })
      const {id:id_file,file_name} = informative.file
      console.log(file_name);
      const informativeDelete = await Informative.destroy({where:{id}})
      const fileDelete = await File.destroy({where:{id:id_file}})

      if(fileDelete && informative){
       fs.unlink( path.resolve('src','public','uploads','files',file_name),(err)=>{
         if(err) throw err;
         console.log('Arquivo deletado da pasta');
       })
      }
      return {fileDelete,informativeDelete}
    } catch (error) {
      throw error.message
    }
  }

};
module.exports = { InformativeDatabase };
