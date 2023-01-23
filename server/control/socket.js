const io = require('socket.io');
const { Socket, Server } = io

const sockets = { }

const messageCallback = function (...args) {
    console.log(args);
}

const disconnection = function (listener = new Server(), socket = Socket()) {
    listener.emit('user-disconnected', socket.id);
    delete sockets[socket.id];
}

const connection = function (listener= new Server(), socket = new Socket()) {
    sockets[socket.id] = socket;
    socket.on('disconnect', () => disconnection(socket));
}

exports.SocketManager = function (http) {
    const listener = new Server(http, { path: '/socket', cors: { origin: '*:*' } });
    listener.on('connection', (socket) => connection(listener, socket));
}