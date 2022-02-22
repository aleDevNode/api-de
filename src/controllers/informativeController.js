const { InformativeDatabase } = require("../database/services/informativeDatabase")

const informativeController = {
    index: async (req,res) =>{
        try {
           const informative = await InformativeDatabase.find()
            return res.status(200).json(informative)
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    },
    create: async (req,res) =>{
        try {
           const response = await InformativeDatabase.create({informative:req.body,file:req.file})
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    },
    delete: async (req,res) =>{
        let id = Object.keys(req.params).length === 0 ? req.body.id : req.params.id;
        try {
           const informative = await InformativeDatabase.delete(id)
            return res.status(200).json(informative)
        } catch (error) {
            return res.status(400).json({error})
        }
    },

}

module.exports = informativeController