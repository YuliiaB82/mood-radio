const express = require("express");
const router = express.Router();
const moodController = require("./controllers/mood-controller");
const spotifyController = require("./controllers/spotify-controller");
const app = express();

router.get("/moods", moodController.getMoods);
router.get("/search/:mood", spotifyController.search);
app.use("/api", router);
app.listen(5000);
