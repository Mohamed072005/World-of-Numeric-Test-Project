import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router/router'
import store from './store'

const app = createApp(App)
app.use(store);
app.use(router);
app.mount('#app');

