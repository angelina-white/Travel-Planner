// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
//   }); 

// server.listen(3001, () => {
//   console.log('listening on *:3001');
// });

import { Server } from "socket.io";

const io = new Server({
    cors: 
    {
        origin: "http://localhost:4000"
    }
});

io.on("connection", (socket) =>
{
    console.log("someone has connected")

    socket.on("disconnect", () =>
    {
        console.log("someone has left")
    })
});

io.listen(4001);