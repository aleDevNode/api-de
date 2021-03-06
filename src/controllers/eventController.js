const path = require('path')
const fs = require('fs')
require("dotenv").config();
const { eventDatabase } = require("../database/services/eventDatabase");
require("dotenv").config();
const eventController = {
  index: async (req, res) => {
    try {
      const event = await eventDatabase.index();
      return res.status(200).json(event);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  findByPk: async (req, res) => {
    try {
      const event = await eventDatabase.findByPk(req.params.id);
      return res.status(200).json(event);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  create: async (req, res) => {
    
    try {
      const files = req.files.map((file) => ({
        ...file,
        path: `${process.env.URI_END_POINT}/images/events/${file.filename}`,
      }));
      const body = {
        ...req.body,
        files,
      };
      const response = await eventDatabase.create(body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    console.log(req.files);
    try {
      const files = req.files.map((file) => ({
        ...file,
        path: `${process.env.URI_END_POINT}/images/events/${file.filename}`,
      }));

      const body = {
        ...req.body,
        files,
      };

      const response = await eventDatabase.update(body);
      console.log(files);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      let id = Object.keys(req.params).length === 0 ? req.body.id : req.params.id;
      const response = await eventDatabase.delete(id)
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = eventController;
