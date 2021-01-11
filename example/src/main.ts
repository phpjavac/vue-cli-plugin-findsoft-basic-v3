import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/styles/index.styl';

if (process.env.VUE_APP_MOCK) import('@/mock/index');
console.log(process.env);

createApp(App).use(store).use(router).mount('#app');
