const {
    Episode,
    Video
} = require('../../models')
const {
    Op
} = require('sequelize');
const { v4: uuid } = require('uuid');
module.exports = {

    findAllEpisodes: async (queryParams) => {
        const {page = 1} = queryParams
        const limit = 2;
        const offset = page < 1 ? 0 : (page - 1) * limit
        const {count: total,rows: episodes} = await Episode.findAndCountAll({
            offset: parseInt(offset),
            limit,
            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: Video,
                as: 'video',
                required: true,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'episode_id']
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return {total,episodes}
    },
    findByPkEpisode: async (params) => {
        const {id} = params
        const episode = await Episode.findByPk(id, {
            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: Video,
                as: 'video',
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
                model: Video,
                as: 'video',
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
  async create(body) {
              //URI da imagem => https://img.youtube.com/vi/WhIfu2Fwi0s/0.jpg
            // URI do videos https://www.youtube.com/watch?v=mpKXSe08yqA

           const {title,link,members,description,type,duration} = body

           const episode = {
               id:uuid(),
               title,
               thumbnail:`https://img.youtube.com/vi/${link}/0.jpg`,
               members,
               description
           } 
           
             const {id:episode_id} = await Episode.create(episode)
           
           const video = {
               id:uuid(),
               url:`https://www.youtube.com/watch?v=${link}`,
               type,
               duration,
               episode_id
           }
           const {id:file_id} = await Video.create(video)

           if(!episode_id && !file_id) throw 'erro ao cadastrar' + episode_id

           return {episode_id,file_id}
    },

   async update (body) {
       
        const {id,title,link,members,description,type,duration} = body
        const episodeById = await this.findByPkEpisode({id})

        if(!episodeById) return 'Erro na busca =>' + episodeById
      
        const episode = {
            title:title?title:episodeById.title,
            members:members?members:episodeById.members,
            thumbnail:link?`https://img.youtube.com/vi/${link}/0.jpg`:episodeById.thumbnail,
            description:description?description:episodeById.description
        } 
        const video = {
           
            url:link?`https://www.youtube.com/watch?v=${link}`:episodeById.url,
            type:type?type:episodeById.type,
            duration:duration?duration:episodeById.duration,
           
        }
        const videoUpdate = await File.update(video,{
            where:{
                id:episodeById.file.id},
        })
        const episodeUpdate = await Episode.update(episode,{
            where:{
                id:episodeById.id,
            }
        })

        if(!videoUpdate || videoUpdate[0]===0 ) throw 'erro whit file update => ' + videoUpdate
        if(!episodeUpdate || episodeUpdate[0]===0) throw 'erro whit Episode update => ' + episodeUpdate
        return {episodeById,msg:"Episode updated successful!"}
        
    },
    
    async delete (id){
        const episodeById = await this.findByPkEpisode({id})
        if(!episodeById) return{error: 'Erro na busca => ' + episodeById}
        
        const videoDelete = await Video.destroy({
            where:{id:episodeById.file.id}
        })
        const episodeDelete = await Episode.destroy({
            where:{id}
        })
        if(!videoDelete || videoDelete[0]===0 ) throw 'erro whit file update => ' + videoDelete
        if(!episodeDelete || episodeDelete[0]===0) throw 'erro whit Episode update => ' + episodeDelete
        return {msg:"Episode deleted successful!"}
       
    }  
    

}