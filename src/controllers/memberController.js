const memberDatabase = require("../database/services/membersDatabase");
require('dotenv').config()
const memberController = {
  index: async (req, res) => {
    try {
      const members = await memberDatabase.findAll(req.query);
      return res.status(200).json(members);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  show: async (req, res) => {
    try {
      const member = await memberDatabase.show(req.params);
      return res.status(200).json(member);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  myTime: async (req, res) => {
    try {
      const members = await memberDatabase.time();
      return res.status(200).json(members);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const member = {
        ...req.body,
        path: `${process.env.HOST}:${process.env.PORT}/uploads/avatar/${req.file.filename}`,
        file_name:req.file.filename,
        type: req.file.mimetype,
      };

      const response = await memberDatabase.create(member);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const member = await memberDatabase.update(req.body);
      return res.status(200).json(member);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const response = await memberDatabase.delete(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = memberController;
