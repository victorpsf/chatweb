import { App } from 'vue'
import { AppEventInterface, CallerRegisterInterface } from '@/interfaces/events/event'
import io from 'socket.io-client'
import { User } from '@/models/user';

const socket = io('192.168.90.103:3000', { path: '/socket', autoConnect: true, transports: ['websocket'] });


const registerEvents = (event: AppEventInterface) => {
    event.on('changed-nickname', (nickname) => socket.emit('chaged-nickname', { nickname }));
    event.on('get-looged-users', () => socket.emit('get-looged-users'));
    
    socket.on('logged-users', (values: User[]) => event.emit('logged-users', values));
    socket.on("connect_error", (err) => console.error(`connect_error due to ${err.message}`));
    socket.on('error', console.log);
}

export default {
    install: async (app: App) => {
        registerEvents(app.config.globalProperties.$event);
        app.config.globalProperties.$socket = socket;
    }
}