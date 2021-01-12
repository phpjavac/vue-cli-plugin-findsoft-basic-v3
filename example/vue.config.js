// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styleJson = require('./src/styles/antd.json');
// 转为es6模块 import项目运行不起来

module.exports = {
  publicPath: './',

  devServer: {
    proxy: {
      '/': {
        target: 'http://zx.aiisx.com/dcaw',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://zx.aiisx.com/dcaw',
        changeOrigin: true,
      },
    },
  },
  pluginOptions: {
    ftp: {
      host: '192.168.1.147', // ftp地址
      remoteFtpPath: '/DISK-D/findsoft_test/tomcat8/webapps/dcaw/', // 项目地址
    },
    toTypes: {
      host: 'http://zx.aiisx.com/dcaw/v2/api-docs', // swagger地址
      TypesPath: './src/types/api.ts', // 生成的interface
    },
  },
  // 解决按需引入插件css引入失败
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: styleJson,
          javascriptEnabled: true,
        },
      },
      stylus: {
        import: path.resolve(__dirname, './src/styles/variable.styl'),
      },
    },
  },
};
