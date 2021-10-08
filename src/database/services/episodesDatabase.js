const {
    Episode,
    File
} = require('../../models')
const {
    Op
} = require('sequelize');
const { v4: uuid } = require('uuid');
module.exports = {

    findAllEpisodes: async (queryParams) => {
        const {
            page = 1
        } = queryParams
        const limit = 2;
        const offset = page < 1 ? 0 : (page - 1) * limit
        const {
            count: total,
            rows: episodes
        } = await Episode.findAndCountAll({
            offset: parseInt(offset),
            limit,
            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: File,
                as: 'file',
                required: true,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'episode_id']
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return {
            total,
            episodes
        }
    },
    findByPkEpisode: async (params) => {
        const {
            id
        } = params

        const episode = await Episode.findByPk(id, {

            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: File,
                as: 'file',
                required: true,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'episode_id']
                }
            },

        })
        return episode
    },
    findSearch: async (query) => {
        const fieldName = Object.keys(query)
        const queryValue = query[fieldName[0]]
        const page = parseInt(query[fieldName[1]])
        const limit = 2;
        const offset = page < 1 ? 0 : (page - 1) * limit
        const {
            count: total,
            rows: episodes
        } = await Episode.findAndCountAll({
            where: {
                [fieldName[0]]: {
                    [Op.like]: `%${queryValue}%`
                }
            },
            offset: parseInt(offset),
            limit,
            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: File,
                as: 'file',
                required: true,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'episode_id']
                }
            },

            order: [
                ['createdAt', 'DESC']
            ]
        })

        return {episodes,total}
    },
    // ### Metodo responsável em Criar os episodios
    create: async (body) => {
              // https://img.youtube.com/vi/WhIfu2Fwi0s/0.jpg
            // https://www.youtube.com/watch?v=mpKXSe08yqA

           const {title,link,members,description,type,duration} = body

           const episode = {
               id:uuid(),
               title,
               thumbnail:`https://img.youtube.com/vi/${link}/0.jpg`,
               members,
               description
           } 
           
             const {id:episode_id} = await Episode.create(episode)
           
           const file = {
               id:uuid(),
               url:`https://www.youtube.com/watch?v=${link}`,
               type,
               duration,
               episode_id
           }
           const {id:file_id} = await File.create(file)

           if(!episode_id && !file_id) throw 'erro ao cadastrar' + episode_id

           return {episode_id,file_id}
    }


}