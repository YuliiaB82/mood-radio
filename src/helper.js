export function wait(timeout) {
  return new Promise((res) => {
    setTimeout(() => res(), timeout);
  });
}
