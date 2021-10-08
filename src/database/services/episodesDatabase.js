const {
    Episode,
    File
} = require('../../models')
const {
    Op
} = require('sequelize');
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
                exclude: ['createdAt', 'updatedAt']
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
                ['published_at', 'DESC']
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
                exclude: ['createdAt', 'updatedAt']
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
                exclude: ['createdAt', 'updatedAt']
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
                ['published_at', 'DESC']
            ]
        })

        return {episodes,total}
    }


}