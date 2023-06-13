import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import bycrypt from 'bcryptjs'


createApp(App).use(store).use(bycrypt).use(router).mount('#app')
