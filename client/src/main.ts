import { createApp } from 'vue'
import App from './views/app/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import socket from './mixins/socket'
import event from './mixins/event'
import components from './components/components'
import './mixins/index.scss'

const core = createApp(App)

core.use(event)
core.use(socket)
core.use(store)
core.use(router)
core.use(components)

core.mount('#app')
