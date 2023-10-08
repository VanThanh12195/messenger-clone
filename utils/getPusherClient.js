import Pusher from "pusher-js";

export const pusherClient = new Pusher("6df44b3f6096c951d0af", {
  cluster: "us2",
});
