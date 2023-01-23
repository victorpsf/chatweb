import { App } from 'vue'
import io from 'socket.io-client'

const sleep = (time: number) => new Promise((resolve) => setTimeout(() => resolve(true), time * 1000))
export default {
    install: async (app: App) => {
        const socket = io('localhost:3000', { path: '/socket', autoConnect: true, transports: ['websocket'] });

        socket.on("connect_error", (err) => {
            console.error(`connect_error due to ${err.message}`);
        });

        socket.on('error', console.log);

        app.config.globalProperties.$socket = socket;
    }
}