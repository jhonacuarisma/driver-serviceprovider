// src/pusherConfig.js
import Pusher from 'pusher-js';

const key = '4e26750382cdf6f67ab2';
const cluster = 'us2';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || key, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER || cluster,
  encrypted: true,
});

export default pusher;
