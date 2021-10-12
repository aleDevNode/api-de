const episodesDatabase = require('../database/services/episodesDatabase')

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
            return res.status(400).json(error);
        }
    },
    show: async (req, res) => {
        try {
            //Do Filter go episode by id
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
            //Filter the episode by parameters
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
            const episode = await episodesDatabase.create(req.body)
            return res.status(200).json(episode);

        } catch (error) {

            return res.status(400).json({
                error
            });
        }
    },
    update: async (req, res) => {
        try {
            const episode = await episodesDatabase.update(req.body)
            return res.status(200).json(episode);
        } catch (error) {

            return res.status(400).json(error);
        }
    },
    delete: async (req, res) =>{
    try {
        const episode = await episodesDatabase.delete(req.body.id)
        return res.status(200).json(episode)
    } catch (error) {
        return res.status(400).json(error)
        
    }
    }

}

module.exports = episodesController