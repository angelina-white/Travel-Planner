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

    socket.on("addUserToVaca", (username) =>
    {
        const user = getUser(username)
        io.to(user.socketId).emit("newMessage", "added")
    })
});

io.listen(4001);