import { io } from "socket.io-client";
import fetch from "node-fetch";

(async () => {
  try {

    const host = 'http://localhost:3000';
    const login = '';
    const password = '';
    // const host = 'https://api.racedevspace.com';
    // const host = 'https://api.racelane.io';

    const response = await fetch(`${host}/api/v1/auth/signin`, {
      method: 'post',
      body: JSON.stringify({
        login,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    const socket = io(`${host}/ws/members-distribution`,
      {
        transports: ['websocket'],
        query: { event_id: 110 },
        auth: { token: data.token }
      });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("members-distribution", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

  } catch (error) {
    console.log(error);
  }
})();