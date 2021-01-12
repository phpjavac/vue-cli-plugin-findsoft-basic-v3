# findsoft的前端基础框架-vue3版本

> Vue CLI 4 的一个第三方插件，专用于初始化实训类相关的vue项目，方便统一维护和更新常用代码。

### 提供的功能
1. 自动预置常用的代码，比如api常量，网络请求等；
2. 自动生成API接口的interface，配置Ftp更新等；
3. 常用基础页面生成，登陆页面，用户管理，班级管理等；
4. 构建项目目录；
5. 添加默认的eslint配置；
### 使用方法
1. 常规创建项目 
	```
	vue add findsoft-basic-3
	请输入项目名称-> eg
	请输入服务器地址-> http://192.168.1.147:8080
	npm install
	npm run dev 即可启动项目
	.env文件控制请求接口 1mock数据
	```

### 推荐的项目目录结构

```
├── public                                 # 放置 index.html，以及可以直接在index.html里引用的文件
│   ├── index.html                         # 入口html
│   ├── static				   			   # 不被webpack打包的静态资源，比如下载的doc等
│         ├──logo			   			   # 项目可配置的图片 图标等资源，方便后续部署替换
│         ├──css			   			   # 不被打包的css文件 一般放重置浏览器默认css
├── src                                    # 源代码
│   ├── assets                             # 静态资源文件，如图片和字体
│       ├── images                         # 图片
│       ├── fonts                          # 字体文件
│   ├── axios                         	   # 调用接口的的基础配置
│   ├── types                         	   # 主要放一些全局的interface
│   ├── components                         # 公共组件
│   ├── lib                                # 放置自开发的基础库，如filter，日期处理方法，可随处移植的
│       ├── filter                         # 过滤器
│   ├── routers                            # 路由，如果路由配置很简单，则可以使用一个文件，如果复杂，则必须放到文件夹下面分模块管理
│   ├── store                              # vuex
│   ├── styles                             # 公共的样式文件，这里不写组件的样式文件，因为组件的样式文件都写到对应的.vue文件里
│       ├── common-resources.styl          # 负责统一引用stylus的公共变量和mixin
│   ├── utils                              # 放置和项目息息相关的基础代码，如request.js
│   ├── views                              # 视图层，页面
│   ├── App.vue                            # vue入口组件
│   ├── main.ts                            # 项目的入口文件
```

### 开发须知
1.开发example中 请保持vscode根目录为example目录
