module.exports = {
  publicPath: '/dcaw/',

  devServer: {
    proxy: {
      '/': {
        target: 'http://192.168.1.147:8080',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://192.168.1.147:8080/',
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
      host: 'http://192.168.1.147:8080/dcaw/v2/api-docs', // swagger地址
      TypesPath: './types/api.ts', // 生成的interface
    },
    // plugins: [
    //   ...proPlugins,
    // ],
  },
  // 解决按需引入插件css引入失败
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
