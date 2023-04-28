import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import nodemailer from 'nodemailer';


createApp(App).use(store).use(nodemailer).use(router).mount('#app')
