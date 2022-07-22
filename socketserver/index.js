import { Server } from "socket.io";

const io = new Server({
    cors: 
    {
        origin: "http://localhost:4000"
    }
});

let onlineUsers = [];

const addNewUser = (username, socketId) =>
{
    !onlineUsers.some(user=>user.username === username) && onlineUsers.push({username, socketId});
}

const removeUser = (socketId) =>
{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (username) =>
{
    return onlineUsers.find(user => user.username === username);
}

io.on("connection", (socket) =>
{
    //send to everyone
    // io.emit("firstEvent", "hello this is test")

    console.log('a user connected');

    socket.on('disconnect', () => 
    {
        removeUser(socket.id);
        console.log(onlineUsers)
    });

    socket.on("newUser", (username) =>
    {
        addNewUser(username, socket.id)
        console.log(onlineUsers)
    })

    socket.on("remove", () =>
    {
        removeUser(socket.id);
        console.log(onlineUsers)
    })

    socket.on("handleMessage", (data) =>
    {
        console.log(data)
        io.emit("showMessage", (data))
    })
});

io.listen(4001);