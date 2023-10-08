import Pusher from "pusher-js";

export default function getPusherClient() {
  const pusher = new Pusher("6df44b3f6096c951d0af", {
    cluster: "us2",
  });
  return pusher;
}
