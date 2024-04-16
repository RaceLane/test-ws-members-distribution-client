import { io } from "socket.io-client";

(async () => {
  try {
    const event_id = process.env.event_id; //99
    const host = process.env.host; //'http://localhost:3000', 'https://api.racedevspace.com', 'https://api.racelane.io'
    const type = +process.env.type; //1

    const socket = io(`${host}/socket.io/v2/events/${event_id}/results`,
      {
        transports: ['websocket'],
        query: {
          type,
        },
        extraHeaders: {
          'accept-language': 'ru',
        },
      });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("event-results", (data) => {
      console.log("event-results", data);
    });

    socket.on("event-finished", (data) => {
      console.log("event-finished");
    })

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

  } catch (error) {
    console.log(error);
  }
})();