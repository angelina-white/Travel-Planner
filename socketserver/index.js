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