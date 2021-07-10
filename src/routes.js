const express = require('express');
const usersController = require('./controllers/userController');
const authController = require('./controllers/authController');
const episodesController = require('./controllers/episodeController')
const authApi = require('./middlewares/authApi')
const routes = express.Router();

// Route of Auth
routes.post('/auth',authController.auth)

// Routes of users
routes.get('/episodes',episodesController.index)
routes.use(authApi.auth)
routes.get('/users', usersController.index)
routes.post('/users', usersController.create)
routes.put('/users', usersController.update)
routes.delete('/users', usersController.delete)

// Routes of users



module.exports = routes;