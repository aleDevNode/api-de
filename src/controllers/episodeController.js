const {Episode,File} = require("../models");
const episodesController = {
    index: async (req, res) => {
        try {

            const {
                page = 1
            } = req.query
            const limit = 2;
            const offset = page < 1 ? 0 : (page - 1) * limit
           
            const{count: total,rows:episodes} = await Episode.findAndCountAll({
                offset: parseInt(offset),
                limit,
                attributes:{exclude:['createdAt','updatedAt']},
                include:{
                    model:File,
                    as:'file',
                    required:true,
                    attributes:{
                        exclude:['createdAt','updatedAt']}
                },
                order:[
                    ['published_at','DESC']
                  ]
            })

           console.log(Object.keys(req.query).length>0?true:false)
           return res.status(200).json({episodes,total});
        } catch (error) {
            return res.status(400).json({msg:error});
        }
    },
parseInt
}

module.exports = episodesController

