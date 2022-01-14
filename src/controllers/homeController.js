const { homeDatabase } = require("../database/services/homeDatabases")

const homeController = {
    index: async (req,res) =>{
        try {
           const response = await homeDatabase.find()
            return res.status(200).json(response)
            
        } catch (error) {
            
            return res.status(400).json({error:error.message})
        }
    },
    update: async (req,res) =>{
       
     
        try {
            const body ={
                ...req.body,
                ...req.file
            }
           
            const home = await homeDatabase.update(body)
         
            return res.status(200).json(home)
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({error:error.message})
        }
    }
}

module.exports = homeController