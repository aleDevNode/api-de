const { File, Event, EventFile } = require("../../models");
const uuid = require("../../utils/uuid");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const eventDatabase = {
  index: async () => {
    try {
      const event = await Event.findAll({
        order: [["created_at", "DESC"]],
        include: {
          model: File,
          as: "files",
          attributes: ["id", "path", "file_name"],
        },
      });
      return event;
    } catch (error) {
      throw error.message;
    }
  },
  findByPk:async(id) =>{
    try {
      const event = await Event.findByPk(id,{
       
        include: {
          model: File,
          as: "files",
          attributes: ["id", "path", "file_name"],
        },
      });
      return event;
    } catch (error) {
      throw error.message;
    }
  },
  create: async (body) => {
    const { title, description, files } = body;
    const eventCreate = {
      id: uuid(),
      title,
      description,
    };

    const responseEvent = await Event.create(eventCreate);

    const filesCreate = files.map((file) => ({
      id: uuid(),
      path: file.path,
      file_name: file.filename,
      type: file.mimetype,
    }));

    if (files.length > 0) {
   const fileMapCreate= filesCreate.map(async (file) => {
        const fileMap = await File.create(file);
        if (!fileMap) return console.log("no register files");
        await EventFile.create({
          id: uuid(),
          file_id: fileMap.id,
          event_id: eventCreate.id,
        });
      });

      return { responseEvent,fileMapCreate };
    }
  },
  update: async (body) => {
    try {
      const { id, title, description, files } = body;

      const event = await Event.findByPk(id, {
        include: {
          model: File,
          as: "files",
          attributes: ["id", "path", "file_name"],
        },
      });
     
       if (!event) throw "error whith search pk event!";

      await event.files.forEach((file) => {
              fs.unlink(
          path.resolve("src", "public", "images", "events", file.file_name),
          (err) => {
            if (err) throw err;
            console.log("Arquivo deletado da pasta=> " + file.file_name);
          }
        );
                 
      });
      const fileDel = event.files.map(async file =>{
        const respDel = await File.destroy({
          where: {
            id:file.id,
          },
        });
        if (respDel) console.log("file deletado com sucesso!");
      })
      const filesCreate = files.map((file) => ({
        id: uuid(),
        path: file.path,
        file_name: file.filename,
        type: file.mimetype,
      }));
   
      if (filesCreate.length > 0) {
      filesCreate.map(async (file) => {
          const fileMap = await File.create(file);
          if (!fileMap) return console.log("no register files");
          await EventFile.create({
            id: uuid(),
            file_id: fileMap.id,
            event_id: id,
          });
        });
      }

      const eventUpdate = {
        title: title ? title : event.title,
        description: description ? description : event.description,
      };

      const responseEvent = await Event.update(eventUpdate, {
        where: {
          id,
        },
      });
      
     
      return responseEvent;
    } catch (error) {
      throw error.message;
    }
  },

};

module.exports = { eventDatabase };
