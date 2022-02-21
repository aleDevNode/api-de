const { Base } = require("../database/services/Base");
const memberDatabase = require("../database/services/membersDatabase");

require("dotenv").config();
const memberController = {
  index: async (req, res) => {
    try {
      const teste = new Base();
      const members = await teste.findAllMembersUsersFile(req.query);
      // const members = await memberDatabase.findAll(req.query);
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
    const {
      name,
      func,
      birth,
      rf,
      gender,
      full_name,
      email,
      cellphone,
      description,
      time,
      location,
    } = req.body;

    //  return res.send({body:req.body,file:req.file})
    try {
      const avatar =
        req.body.gender == "M" ? "avatar-male.svg" : "avatar-female.svg";
      const path = req.file
        ? `${process.env.URI_END_POINT}/uploads/avatar/${req.file.filename}`
        : `${process.env.URI_END_POINT}/uploads/avatar/${avatar}`;
      const file_name = req.file ? req.file.filename : "avatar-male.svg";
      const type = req.file ? req.file.mimetype : "image/svg";

      const member = {
        name,
        func,
        birth,
        rf,
        full_name,
        email,
        gender,
        cellphone,
        description,
        time: time == "on" ? true : false,
        location,
        status: true,
        path,
        file_name,
        type,
      };
     

      const response = await memberDatabase.create(member);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
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
    console.log('teste');
    try {
      const response = await memberDatabase.delete(req.params);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = memberController;
