const episodesDatabase = require('../database/services/episodesDatabase')
const {
    Episode,
    File
} = require('../models')
const {
    Op
} = require('sequelize');
const episodesController = {
    index: async (req, res) => {
        try {
            // List all episodes whit pagination
            const {
                episodes,
                total
            } = await episodesDatabase.findAllEpisodes(req.query);
            return res.status(200).json({
                episodes,
                total
            });
        } catch (error) {
            return res.status(400).json({
                msg: error
            });
        }
    },
    show: async (req, res) => {
        try {
            // Do Filter fo episode by id
            if (Object.keys(req.params).length > 0) {
                const episode = await episodesDatabase.findByPkEpisode(req.params);
                return res.status(200).json(episode);
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    search: async (req, res) => {

        try {
            const {
                episodes,
                total
            } = await episodesDatabase.findSearch(req.query);
            return res.status(200).json({
                episodes,
                total
            });
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    create: async (req, res) => {
        try {
            return res.status(200).json(req.body);

        } catch (error) {

            return res.status(400).json({
                error
            });
        }
    }

}

module.exports = episodesController