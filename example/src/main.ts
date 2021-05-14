import { createApp } from 'vue';
import moment from 'moment';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from './axios/fetch';
import '@/styles/index.styl';

const getSimulation = () => import('@/mock/index');

/**
* 打印版本号
* */
const logVersion = async () => {
  if (process.env.NODE_ENV === 'production') {
    const style = 'padding:4px;border-radius:2px;background:#1890ff;color:white;';
    try {
      const { data } = await axios.get('version/get');
      console.log(`%c服务端SVN版本：${data.version}`, style);

      const res = await axios.get(`version.json?t=${new Date().valueOf()}`);
      console.log(`%c客户端SVN版本：${res.data.rev}`, style);
      console.log(`%c打包时间：${moment(new Date().valueOf()).format('yyyy-MM-DD HH:mm:ss')}`, style);
    } catch (e) {
      console.log(e);
    }
  }
};

const instantiationApp = async () => {
  if (process.env.VUE_APP_MOCK === '1') {
    await getSimulation();
  }
  logVersion();
  createApp(App).use(store).use(router).mount('#app');
};

instantiationApp();
