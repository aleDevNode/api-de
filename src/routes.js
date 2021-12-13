const express = require("express");
const usersController = require("./controllers/userController");
const authController = require("./controllers/authController");
const episodesController = require("./controllers/episodeController");
const membersController = require('./controllers/memberController')
const authApi = require("./middlewares/authApi");
const avatar = require('./middlewares/avatar')
const routes = express.Router();

// Route of Auth
routes.post("/auth", authController.auth);

routes.get("/new-password:token",authController.newPassword);
// Authentication Middlewares with JWT
// routes.use(authApi.auth)

// Routes of Episodes
routes.get("/episodes", episodesController.index);
routes.get("/episode/:id", episodesController.show);
routes.get("/episodes/search", episodesController.search);
routes.post("/episodes", episodesController.create);
routes.put("/episodes", episodesController.update);
routes.delete("/episodes", episodesController.delete);

//Routes of Members
routes.get('/members',membersController.index)
routes.get('/members/:id',membersController.show)
routes.get('/my-time',membersController.myTime)
routes.post('/members',avatar.single("avatar"),membersController.create)
routes.put('/members',membersController.update)
routes.delete('/members',membersController.delete)


// Routes of users
routes.get("/users", usersController.index);
routes.get("/user/:id", usersController.show);
routes.get("/user", usersController.login);
routes.post("/users", usersController.create);
routes.put("/users",authApi.auth,usersController.update);
routes.delete("/users", usersController.delete);

module.exports = routes;
