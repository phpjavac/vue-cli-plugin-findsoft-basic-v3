import { Modal, message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';

const { CancelToken } = axios;
const source = CancelToken.source();
const http = axios.create({
  baseURL: '',
  headers: {},
});

// 是否携带cookie
http.defaults.withCredentials = false;
if (sessionStorage.getItem('token')) {
  http.defaults.headers.common.token = sessionStorage.token;
}

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token;
    if (localStorage.token) {
      token = localStorage.token;
    }
    if (sessionStorage.token) {
      token = sessionStorage.token;
    }
    config.headers.common.token = token;
    return config;
  },
  (error) => Promise.reject(error),
);
// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    response.config.cancelToken = source.token;
    if (response.data.success) {
      return response;
    } if (response.data.success === undefined) {
      // 修复部分接口不符合返回格式规范，导致无法获取response
      return response;
    }

    if (response.data.tokenValidateError) {
      source.cancel(response.data.message);
      Modal.error({
        title: '错误',
        content: response.data.message,
        onOk() {
          sessionStorage.clear();
          window.location.href = '/';
        },
      });
    } else if (!response.data.success) {
      // 提示一下 接口的抛错信息
      message.error(response.data.message);
    }
    return Promise.reject(response.data.message);
  },
  (error) => Promise.reject(error),
);

export default http;
