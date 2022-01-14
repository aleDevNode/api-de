const { aboutDatabase } = require("../database/services/aboutDatabase");

const aboutController = {
  index: async (req, res) => {
    try {
      const about = await aboutDatabase.index();
      return res.status(200).json(about);
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  },
  update: async (req, res) => {
console.log(req.body);
try {
  const body ={
      ...req.body,
      ...req.file
  }
  const home = await aboutDatabase.update(body)
  return res.status(200).json(home)
  
} catch (error) {
  
  return res.status(400).json({error:error.message})
}
}
};

module.exports =  aboutController ;
