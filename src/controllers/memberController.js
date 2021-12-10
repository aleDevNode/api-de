const memberDatabase = require('../database/services/membersDatabase')
const memberController = {

index: async (req,res) =>{
    try {
       const members = await memberDatabase.findAll(req.query)
        return res.status(200).json(members)
        
    } catch (error) {
        
        return res.status(400).json(error)
    }
},

show:  async (req,res) =>{
    try {
       const member = await memberDatabase.show(req.params)
        return res.status(200).json(member)
        
    } catch (error) {
        
        return res.status(400).json(error)
    }
},
myTime:  async (req,res) =>{
    try {
     const members = await memberDatabase.time()
        return res.status(200).json(members)
        
    } catch (error) {
        
        return res.status(400).json(error)
    }
},
create: async (req,res) =>{
    const member = await memberDatabase.create(req.body)
    return  res.status(200).json(member)
}

}

module.exports = memberController