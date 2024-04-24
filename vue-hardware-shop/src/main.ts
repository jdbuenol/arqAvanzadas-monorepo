import { createApp } from 'vue';
import MyApp from './App.vue';
import router from './router';
import Toast from 'vue-toastification';

import { createPinia } from 'pinia';

import './global.css';
import 'vue-toastification/dist/index.css';

const pinia = createPinia();
const app = createApp(MyApp).use(router).use(Toast).use(pinia);
app.mount('#app');
