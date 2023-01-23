import { Server } from 'socket.io'

const cache = {
    socket: null
}

const messageCallback = function (...args) {
    console.log(args);
}

export const SocketManager = function (http) {
    cache.socket = new Server(http);
    cache.socket.on('*', messageCallback);
}