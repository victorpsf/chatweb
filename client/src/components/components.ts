import { App } from "vue";
import UsersComponents from '@/components/users/UsersComponent.vue'

export default {
    install: function (vue: App) {
        vue.component('users-component', UsersComponents);
    }
}