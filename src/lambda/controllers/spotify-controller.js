const axios = require("axios");
require("dotenv").config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const isLocal = process.env.IS_LOCAL_HOST;

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getRedirectUrl = function (req) {
  return `${isLocal ? "http" : req.protocol}://${req.get(
    "host"
  )}/.netlify/functions/api/auth/callback`;
};

exports.login = (req, res) => {
  const scope =
    "streaming user-read-email user-read-private user-read-playback-state user-read-playback-position user-modify-playback-state";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: getRedirectUrl(req),
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
};

exports.authCallback = async (req, res) => {
  const code = req.query.code;
  const result = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data:
      "grant_type=authorization_code&redirect_uri=" +
      getRedirectUrl(req) +
      "&code=" +
      code,
  });
  if (result.data && result.data.access_token) {
    res.cookie("token", result.data.access_token, {
      secure: true,
      maxAge: 3600,
    });
    res.redirect("/");
  } else {
    res.sendStatus(result.status);
  }
};

exports.play = async (req, resp) => {
  console.log("Put is " + req.body.deviceId);
  if (!req.headers.authorization) {
    return resp.status(403).json({ error: "No credentials sent!" });
  }
  const device = req.body.deviceId;
  const spotifySongs = req.body.spotifySongs;
  const spotifyAlbum = req.body.spotifyAlbum;
  try {
    const transferResult = await axios({
      method: "PUT",
      url: `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
      cache: "no-cache",
      headers: {
        Authorization: req.headers.authorization,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { uris: spotifySongs, context_uri: spotifyAlbum },
    });

    resp.sendStatus(transferResult.status);
  } catch (e) {
    console.log(e);
    resp.status(500).send(e.message);
  }
};

exports.search = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  console.log("Mood: " + req.params.mood);
  try {
    const searchResult = await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/search?q=" +
        req.params.mood +
        "&type=playlist&limit=9",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
    });
    const cardItems = searchResult.data.playlists.items.map((i) => {
      return { id: i.uri, title: i.name, image: i.images[0].url };
    });
    res.json(cardItems);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
