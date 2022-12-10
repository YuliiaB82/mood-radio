export function wait(timeout) {
  return new Promise((res) => {
    setTimeout(() => res(), timeout);
  });
}

export async function play(token, deviceId, spotifyUri) {
  await fetch("/api/play", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ deviceId, spotifyUri }),
  });
}
