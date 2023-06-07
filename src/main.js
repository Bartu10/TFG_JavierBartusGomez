import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import Swal from 'sweetalert2'
import bycrypt from 'bcryptjs'


createApp(App).use(store).use(bycrypt).use(router).mount('#app')
//use(Swal).