import { App } from "vue";
import UsersComponents from '@/components/users/UsersComponent.vue'
import ChatComponent from '@/components/chat/ChatComponent.vue'

export default {
    install: function (vue: App) {
        vue.component('users-component', UsersComponents);
        vue.component('chat-component', ChatComponent);
    }
}