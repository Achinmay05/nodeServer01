// node server which will handle socket io connections
require('dotenv').config();
const io = require('socket.io')(process.env.PORT, { cors: { origin: "*" } });
const users = {};


    console.log(`Server is running on port ${process.env.PORT}`);


io.on('connection', socket => {
    // when new user joins
    socket.on('new-user-joined', userName => {
        // console.log("New user", userName)
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName)
    });

    // when someone sends message
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, userName: users[socket.id] })
    });

    // when someone leaves the chat
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})

