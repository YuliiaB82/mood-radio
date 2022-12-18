const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const moodController = require("./controllers/mood-controller");
const spotifyController = require("./controllers/spotify-controller");
const app = express();
const router = express.Router();

router.get("/moods", moodController.getMoods);
router.get("/auth/login", spotifyController.login);
router.get("/auth/callback", spotifyController.authCallback);
const jsonParser = bodyParser.json();
router.put("/play", jsonParser, spotifyController.play);
router.get("/search/:mood", spotifyController.search);

app.use("/.netlify/functions/api", router);
module.exports = app;
module.exports.handler = serverless(app);
