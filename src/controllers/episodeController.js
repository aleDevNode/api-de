const episodesDatabase = require('../database/services/episodesDatabase')
const {Episode,File} = require('../models')
const {Op} = require('sequelize');
const { v4: uuid } = require('uuid');
const episodesController = {
    index: async (req, res) => {
        try {
            // List all episodes whit pagination
            const {episodes,total} = await episodesDatabase.findAllEpisodes(req.query);
            return res.status(200).json({episodes,total });
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
        const episode = await episodesDatabase.create(req.body)
            return res.status(200).json(episode);
            
        } catch (error) {
            
            return res.status(400).json({
                error
            });
        }
    },
    update: async(req, res) =>{
        try {

            const {id,title,link,members,description,type,duration} = req.body
            const episodeById = await episodesDatabase.findByPkEpisode({id})

            
            const episode = {
                title:title?title:episodeById.title,
                members:members?members:episodeById.members,
                thumbnail:link?`https://img.youtube.com/vi/${link}/0.jpg`:episodeById.thumbnail,
                description:description?description:episodeById.description
            } 
            
          
            const file = {
                url:link?`https://www.youtube.com/watch?v=${link}`:episodeById.url,
                type:type?type:episodeById.type,
                duration:duration?duration:episodeById.duration,
               
            }

            

            return res.status(200).json(episode);
        } catch (error) {
            
            return res.status(200).json(error);
        }
    }

}

module.exports = episodesController