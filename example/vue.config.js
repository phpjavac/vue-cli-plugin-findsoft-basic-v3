/* eslint-disable global-require */
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
    buildVersion: {
      path: require('path').resolve('dist'), // build root dir
      env: require('process').env, // env obj
      cvs: 'git', // cvs type, git or svn
      versionPath: '', // version file parent dir, empty string for default
      name: '', // version file name, empty string for default
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
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
