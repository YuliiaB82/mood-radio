export function wait(timeout) {
  return new Promise((res) => {
    setTimeout(() => res(), timeout);
  });
}

const defaultPlaylist = "spotify:playlist:6jTIqtJmJgrHyTS0rh1t71";

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
