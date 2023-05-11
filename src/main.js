import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import Swal from 'sweetalert2'


createApp(App).use(store).use(Swal).use(router).mount('#app')
