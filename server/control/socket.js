const io = require('socket.io');
const { Socket, Server } = io

const sockets = { }

const getLoggedUsers = function (socket) {
    const users = Object.keys(sockets)
        .filter(a => a != socket.id)
        .map(a => ({ id: a, nickname: sockets[a].nickname }));
    socket.emit('logged-users', users);
}

const sendMessage = function (socket, message) {
    if (sockets[message.target] === undefined) return;
    sockets[message.target].socket.emit('received-message', message);
}

const changeNickname = function (socket = new Socket(), ...args) {
    sockets[socket.id].nickname = nickname;
    socket.emit('user-changed-nickname', { id: socket.id, nickname })
}

const socketListeners = function (socket = new Socket()) {
    socket.on('changed-nickname', (...args) => changeNickname.apply(null, [socket].concat(args)))
    socket.on('get-looged-users', () => getLoggedUsers(socket));
    socket.on('send-message', (message) => sendMessage(socket, message));
}

const disconnection = function (listener = new Server(), socket = new Socket()) {
    listener.emit('user-disconnected', socket.id);
    delete sockets[socket.id];
}

const connection = function (listener = new Server(), socket = new Socket()) {
    sockets[socket.id] = { nickname: socket.id, socket };
    socketListeners(socket);
    socket.on('disconnect', () => disconnection(listener, socket));
}

exports.SocketManager = function (http) {
    const listener = new Server(http, { path: '/socket', cors: { origin: '*:*' } });
    listener.on('connection', (socket) => connection(listener, socket));
}