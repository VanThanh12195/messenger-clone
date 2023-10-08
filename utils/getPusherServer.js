
const Pusher = require("pusher");

const getPusherServer = () => {
  return new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
  });
}

const globalForPusher = globalThis

const pusher = globalForPusher.pusher ?? getPusherServer()

export default pusher

if (process.env.NODE_ENV !== 'production') globalForPusher.pusher = pusher
