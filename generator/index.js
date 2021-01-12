module.exports = (api, options) => {
    api.render('./template')
    api.extendPackage({
        scripts: {
            dev: 'vue-cli-service getTypes && vue-cli-service serve',
            getTypes: 'vue-cli-service getTypes',
        },
        dependencies: {
            "@ant-design-vue/use": "^0.0.1-alpha.8",
            "ant-design-vue": "^2.0.0-rc.5",
            "axios": "^0.21.1",
            "mockjs": "^1.1.0",
            "moment": "^2.29.1",
        },
        devDependencies: {
            "@types/mockjs": "^1.0.3",
            "babel-plugin-import": "^1.13.3",
            "pug": "^3.0.0",
            "pug-plain-loader": "^1.0.0",
            "less": "^3.13.1",
            "less-loader": "^7.2.0",
            "vue-cli-plugin-swagger-to-types": "~1.2.0",
            "stylus": "^0.54.7",
            "vue-cli-plugin-ftp": "^1.1.1",
            "stylus-loader": "^3.0.2",

        }
    })
    // 基础 vue.config.js 参数设置
    api.extendPackage({
        vue: {
            lintOnSave: false,
            // baseUrl Deprecated since Vue CLI 3.3, 使用 publicPath 替代
            publicPath: `/${options.productName}`,
            devServer: {
                proxy: {
                  '/': {
                    target: options.serverPath,
                    changeOrigin: true,
                    ws: false,
                  },
                },
              },
            pluginOptions: {
                toTypes: {
                    host: `${options.serverPath}/${options.productName}/v2/api-docs`,
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
        },
    })
}