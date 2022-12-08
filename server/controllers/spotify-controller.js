require("dotenv").config();

const redirectUri = "http://localhost:3000/api/auth/callback";
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.login = (req, res) => {
  const scope =
    "streaming user-read-email user-read-private user-read-playback-state user-read-playback-position user-modify-playback-state";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
};

exports.authCallback = async (req, res) => {
  const code = req.query.code;
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    headers: new Headers({
      Authorization:
        "Basic " +
        new Buffer(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body:
      "grant_type=authorization_code&redirect_uri=" +
      redirectUri +
      "&code=" +
      code,
  });
  const jsonText = await result.json();
  if (result.ok) {
    res.cookie("token", jsonText.access_token, { secure: true, maxAge: 3600 });
    res.redirect("/");
  } else {
    res.sendStatus(result.status);
  }
};

exports.changeDevice = async (req, resp) => {
  console.log("Put is " + req.body.device_ids);
  const transferResult = await fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    cache: "no-cache",
    headers: {
      Authorization: "Bearer " + req.body.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ device_ids: req.body.device_ids }),
  });

  if (transferResult.ok !== true) {
    const respText = await transferResult.text();
    console.log(respText);
    resp.status(transferResult.status).send(respText);
  } else {
    resp.sendStatus(transferResult.status);
  }
};

exports.search = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  console.log("Mood: " + req.params.mood);
  const searchResult = await fetch(
    "https://api.spotify.com/v1/search?q=" +
      req.params.mood +
      "&type=playlist&limit=8",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
    }
  );
  if (searchResult.ok) {
    const resultJson = await searchResult.json();
    res.json(resultJson);
  } else {
    const respText = await searchResult.text();
    res.status(searchResult.status).send(respText);
  }
};
