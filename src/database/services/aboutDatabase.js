const {File,About} =  require('../../models')
require('dotenv').config()
const aboutDatabase = {

    index:async () =>{
        try {
            const response = await About.findAll({
                limit:1,
                attributes: ["id", "title", "description"],
                include: {
                    model: File,
                    as: "file",
                    attributes: ["id", "path"],
                  },
            })
            return response
            
        } catch (error) {
            
            throw error.message
        }
    },
    update:async (body) =>{
        const {id, title, description} = body;
        const about = await About.findByPk(id, {
            attributes: ["id", "title", "description"],
            include: {
              model: File,
              as: "file",
              attributes: ["id", "path", "type"],
            },
          });
          if (!about) throw "Error => erro na busca";
    const file = {
      ...about.file.dataValues,
    };
    const aboutUpdate = {
        title: title ? title : about.title,
        description: description ? description : about.description,
      };
      const fileUpdadte = {
        path: body.filename
          ? `${process.env.URI_END_POINT}/images/${body.filename}`
          : file.path,
        file_name: body.filename ? body.filename : about.file.file_name,
        type: body.mimetype,
      };
      const responseFile = await File.update(fileUpdadte, {
        where: {
          id: about.file.id,
        },
      });
      if (!responseFile) throw "Error => error whit updateFile";
      const responseAbout = await About.update(aboutUpdate, {
        where: {
          id,
        },
      });
      if (!responseAbout) throw "Error => error whit update";
        return {responseFile,responseAbout}
    },
}

module.exports = {aboutDatabase}