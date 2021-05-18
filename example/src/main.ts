import { createApp } from 'vue';
import moment from 'moment';
import { MockRouter } from './mock/index';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from './axios/fetch';
import '@/styles/index.styl';

// eslint-disable-next-line no-new
new MockRouter();

// TODO 根据版本号自动刷新页面清除缓存
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
      console.log(
        `%c打包时间：${moment(new Date().valueOf()).format('yyyy-MM-DD HH:mm:ss')}`,
        style,
      );
    } catch (e) {
      console.log(e);
    }
  }
};

const instantiationApp = async () => {
  logVersion();
  createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
};

instantiationApp();
