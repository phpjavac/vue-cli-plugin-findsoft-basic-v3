import { createApp } from 'vue';
import { MockRouter } from './mock/index';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/styles/index.styl';

const mockRouter = new MockRouter();
console.log(mockRouter);

const instantiationApp = async () => {
  // if (process.env.VUE_APP_MOCK === '1') {

  // }
  createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
};

instantiationApp();
