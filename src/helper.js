export function wait(timeout) {
  return new Promise((res) => {
    setTimeout(() => res(), timeout);
  });
}

export const defaultPlaylist = "spotify:playlist:6jTIqtJmJgrHyTS0rh1t71";

export async function play(token, deviceId, spotifyAlbum, spotifySongs) {
  if (!spotifyAlbum && !spotifySongs) spotifyAlbum = defaultPlaylist;

  await fetch("/api/play", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ deviceId, spotifyAlbum, spotifySongs }),
  });
}

export async function getMoods() {
  const moodsRequest = await fetch("/api/moods", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (moodsRequest.ok) {
    const jsonRes = await moodsRequest.json();
    return jsonRes;
  }
  return [];
}

export async function searchPlaylists(token, title) {
  const searchRequest = await fetch(`/api/search/${title}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (searchRequest.ok) {
    const jsonRes = await searchRequest.json();
    return jsonRes;
  }
  return [];
}
