const { Home, File } = require("../../models");
require("dotenv").config();
const homeDatabase = {
  find: async () => {
    const home = await Home.findAll({
      attributes: ["id", "title", "sub_title"],
      include: {
        model: File,
        as: "file",
        attributes: ["id", "path"],
      },
    });
    return home;
  },
  update: async (body) => {
    const { id, title, sub_title } = body;

    const home = await Home.findByPk(id, {
      attributes: ["id", "title", "sub_title"],
      include: {
        model: File,
        as: "file",
        attributes: ["id", "path", "type"],
      },
    });

    if (!home) throw "Error => erro na busca";
    const file = {
      ...home.file.dataValues,
    };

    const homeUpdate = {
      title: title ? title : home.title,
      sub_title: sub_title ? sub_title : home.sub_title,
    };

    const fileUpdadte = {
      path: body.filename
        ? `${process.env.URI_END_POINT}/images/${body.filename}`
        : file.path,
      file_name: body.filename ? body.filename : home.file.file_name,
      type: body.mimetype,
    };

    const responseFile = await File.update(fileUpdadte, {
      where: {
        id: home.file.id,
      },
    });

    if (!responseFile) throw "Error => error whit updateFile";

    const responseHome = await Home.update(homeUpdate, {
      where: {
        id,
      },
    });
    if (!responseHome) throw "Error => error whit update";
    return { responseHome, responseFile };
  },
};
module.exports = { homeDatabase };
