import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/styles/index.styl';

const getSimulation = () => import('@/mock/index');

const instantiationApp = async () => {
  if (process.env.VUE_APP_MOCK === '1') {
    await getSimulation();
  }
  createApp(App).use(store).use(router).mount('#app');
};

instantiationApp();
