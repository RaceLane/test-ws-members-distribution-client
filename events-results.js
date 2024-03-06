import { io } from "socket.io-client";
import fetch from "node-fetch";

(async () => {
  try {
    const event_id = process.env.event_id; //99
    const host = process.env.host; //'http://localhost:3000', 'https://api.racedevspace.com', 'https://api.racelane.io'
    const login = process.env.login; //'test'
    const password = process.env.password; //'test'
    const type = +process.env.type; //1

    const response = await fetch(`${host}/api/v1/auth/signin`, {
      method: 'post',
      body: JSON.stringify({
        login,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    const socket = io(`${host}/socket.io/v1/events/${event_id}/results`,
      {
        transports: ['websocket'],
        query: {
          type,
        },
        extraHeaders: {
          'accept-language': 'ru',
        },
        auth: { token: data.token }
      });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("event-results", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

  } catch (error) {
    console.log(error);
  }
})();