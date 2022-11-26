require("dotenv").config();

let accessToken;
async function getSpotifyTokenRequest() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    headers: new Headers({
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: "grant_type=client_credentials",
  });
  const jsonText = await result.json();
  return jsonText;
}
async function getSpotifyToken(needNew) {
  if (!accessToken || needNew) {
    let accessTokenRes = await getSpotifyTokenRequest();
    accessToken = accessTokenRes.access_token;
  }
  return accessToken;
}

exports.search = async (req, res, next) => {
  console.log("Mood: " + req.params.mood);
  const searchResult = await fetch(
    "https://api.spotify.com/v1/search?q=" +
      req.params.mood +
      "&type=playlist&limit=6",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getSpotifyToken()),
      },
    }
  );
  if (searchResult.ok) {
    const resultJson = await searchResult.json();
    res.json(resultJson);
  } else if (searchResult.status === 401) {
    await getSpotifyToken(true);
    await search(req, res, next);
  } else {
    next(searchResult.statusText);
  }
};
