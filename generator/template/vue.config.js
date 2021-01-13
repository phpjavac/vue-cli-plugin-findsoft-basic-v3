// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styleJson = require('./src/styles/antd.json');
// 转为es6模块 import项目运行不起来

module.exports = {
  // 解决按需引入插件css引入失败
  
    lintOnSave: false,
    // baseUrl Deprecated since Vue CLI 3.3, 使用 publicPath 替代
    publicPath:'/<%= options.productName %>',
    devServer: {
      proxy: {
        '/': {
          target: '<%= options.serverPath %>',
          changeOrigin: true,
          ws: false,
        },
      },
    },
  pluginOptions: {
      toTypes: {
          host: '<%= options.serverPath %>/<%= options.productName %>/v2/api-docs',
          TypesPath: './src/types/api.ts',
      },
      ftp: {
          host: '自行配置',
          // 须自行配置路径
          remoteFtpPath: 'DISK-D/findsoft_test/tomcat8/webapps/eg/',
      },
  },
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
