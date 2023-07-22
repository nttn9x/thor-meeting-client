export const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export async function getLocalStream(
  constraints = {
    audio: true,
    video: true,
  }
) {
  return await navigator.mediaDevices.getUserMedia(constraints);
}

export function getGridTemplate(count: number) {
  switch (count) {
    case 1:
      return "grid-cols-1 grid-rows-1";
    case 2:
      return "grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1";
    case 3:
    case 4:
      return "grid-cols-2 grid-rows-2";
    default:
      return "grid-cols-2 md:grid-cols-4 grid-rows-3";
  }
}
