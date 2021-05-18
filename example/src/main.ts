import { createApp } from 'vue';
import { MockRouter } from './mock/index';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/styles/index.styl';

// eslint-disable-next-line no-new
new MockRouter();

const instantiationApp = async () => {
  createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
};

instantiationApp();
