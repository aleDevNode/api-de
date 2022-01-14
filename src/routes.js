const express = require("express");
const usersController = require("./controllers/userController");
const authController = require("./controllers/authController");
const episodesController = require("./controllers/episodeController");
const membersController = require("./controllers/memberController");
const homeController = require('./controllers/homeController')
const aboutController = require('./controllers/aboutController')
const informativeController = require('./controllers/informativeController')
// Middleware
const authApi = require("./middlewares/authApi");
const avatar = require("./middlewares/avatar");
const filePdf = require("./middlewares/filePdf");
const imagePage = require("./middlewares/imagePage");
const routes = express.Router();

// Route of Auth
routes.post("/auth", authController.auth);
// Routes loading for site
routes.get("/episodes", episodesController.index);
routes.get("/list-episodes", episodesController.list);
routes.get("/episodes/search", episodesController.search);
routes.get("/episode/:id", episodesController.show);
routes.get("/my-time", membersController.myTime);
routes.get("/home", homeController.index);
routes.get("/about",aboutController.index);
routes.get('/informatives',informativeController.index)


routes.use(authApi.auth);

// Authentication Middlewares with JWT

routes.get("/new-password:token", authController.newPassword);

// Routes of Episodes
routes.post("/episodes", episodesController.create);
routes.put("/episodes", episodesController.update);
routes.delete("/episodes", episodesController.delete);

//Routes of Members
routes.get("/members", membersController.index);
routes.get("/members/:id", membersController.show);
routes.post("/members", avatar.single("avatar"), membersController.create);
routes.put("/members", membersController.update);
routes.delete("/members", membersController.delete);

// Routes of users
routes.get("/users", usersController.index);
routes.get("/user/:id", usersController.show);
routes.get("/user", usersController.login);
routes.get("/search/user", usersController.search);
routes.post("/users", usersController.create);
routes.put("/users", authApi.auth, usersController.update);
routes.delete("/users", usersController.delete);

// Routes of Informatives 

// Routes of home update
routes.put("/home",imagePage.single('capa'),homeController.update);

// Routes of About update
routes.put("/about",imagePage.single('about'),aboutController.update);

// Routes of Informatives
routes.post('/informatives',filePdf.single("pdf"), informativeController.create)

module.exports = routes;
