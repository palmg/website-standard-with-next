# 前端样板工程

## 简介
以Nextjs作为基础的样本工程，用于其他业务项目的模板。
模板中使用了[Ant Design](https://ant.design/)作为案例显示包，可以通过简单的修改将其移除或更换为其他的视觉框架。

## 安装&运行
```bash
$ git clone https://github.com/palmg/website-standard-with-next.git
$ cd website-standard-with-next
$ npm install
```
```shell
# 开发
$ npm run dev

# 打包
$ npm run build

# 运行打包文件
$ npm start
```


## 工程结构
工程结构主要参考*Nextjs*的要求，建议按照此结构构建工程。
> ./表示从工程根目录开始
#### ./pages
页面目录，每一个js文件或文件夹(文件夹中的index.js文件作为入口文件)都是一个页面。文件名称就是访问路径。

#### ./components
组件目录，页面中引用的组件或页面之外的元素（例如有模板中的菜单组件）放置到这里。外部请求无法直接访问。

##### ./pages与./components文档的差异
1. 在`./pages`中的第一层组件（`App`的子组件）可以指定`getInitialProps`静态方法异步读取同构数据（支持SSR）,详见模板中的`./pages/z-demo-list.js`方法。
2. 在*Nextjs*进行分割打包时，会更加倾向于将`./components`中的代码打包到公有包中。而page中的内容会分开打包。

#### ./config
工程代码运行相关的配置目录，例如url、路由、link、发布版本号:
```javascript 1.8
// next.config.js
配置发布版本号
import {getBuildId} from './config/id'

module.exports = {
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return getBuildId()
  }
}
```

#### ./data 
业务相关的数据，通常情况下可以不使用这个文件夹。在某些时候为了独立于后端开发调试将模拟数据防止于此。

#### ./server
服务器运行相关的代码目录。纯服务端代码

#### ./util
前后端通用工具，这些工具与样式或呈现效果无关，为了处理某些特定并且通用的的任务。

#### ./.babelrc
*Babel*全局配置，这个配置会同时影响前后端执行。如果使用默认配置，可以移除这个文件。模板中的`.babelrc`增加了`Antd`组件以及样式的按需加载功能。

#### ./next.config.js
*Nextjs*的配置入口。详见[Nextjs配置](#nextjsConfig)

### 组件与页面结构
在`./pages`和`./components`目录下都是放置用于页面展示和交互的组件。每一个页面和组件都应该有其规范的文件结构。结构和规范遵循以下几点。

#### 不使用`index.js`
除了工程入口页面（`./page/index.js`）,在任何位置都不要处理命名为index.js的文件，这会非常不利于调试。

#### 页面入口索引的结构
一个前端工程任何功能都是以一个“页面”作为入口的，一个“页面”汇总了某一项业务的功能。所以工程的React组件组织结构都以页面作为入口。将页面所使用的组件放置到`./components`目录下。

以`./page/about.js`为例，他是一个路径为`[domain]:[port]/about`的页面。页面独有的组件放置在`./components`对应文件夹下，因此`./page/about.js`对应的组件在`./components/about`中。

`./page/index.js`因为其命名的特殊性，将其对应的组件命名为`./components/home.js`

#### App组件与通用组件
1. 仅仅与_app或_document有关的组件放置在`./components/app`以及`./components/document`目录下。
1. 通用组件放置在`./components/common`中，例如`button`、`switch`等组件。

## 注意事项与问题
### Nextjs调用过程
*Nextjs*的调用过程在前后端会有些许差异。通常情况下后端的执行比较完整，但是“只执行一次”（这里的执行一次是指前端第一次打开页面或刷新页面时才执行），而前端在初次打开和“页面跳转”的时候执行循序有所区别。

#### 服务端执行过程
1.  _App getInitialProps()!
1.  _Page getInitialProps()!
1.  _Document getInitialProps() before _App render()!
1.  _App constructor()!
1.  _App render()!
1.  _Page constructor()!
1.  _Page render()!
1.  _Document getInitialProps() after _App render()!
1.  _Document constructor()!
1.  _Document render()!

#### 客户端执行过程
**初始化页面时：**
1.  _App constructor()!
1.  _App render()!
1.  _Page constructor()!
1.  _Page render()!

**页面跳转时：**
1.  _App getInitialProps()!
1.  _Page getInitialProps()!
1.  _App render()!
1.  _Page constructor()!
1.  _Page render()!

### 通用自定义配置
1. 输出文件配置：key:distDir, value:项目根目录向下的路径。例如`{distDir: 'dist'}`。
2. 
## 第三方
### 引入包
1. **antd**:蚂蚁金服React开源前端样式组件。
1. **express**:用于服务器执行的大前端服务器。
1. **isomorphic-unfetch**:fetch的多种浏览器兼容实现。
1. **nextjs**:前后端同构渲染框架，已经整合了webpack、react-route的功能，自动实现前后端同构渲染。
1. **React**:Facebook开源前端框架。
1. **"babel-plugin-import"**:antd项目开发的按需加载服务。
1. **@zeit/next-sass**:nextjs扩展的sass/scss的webpack打包处理工具。
1. **classnames**:样式处理工具
1. **cross-env**:环境指示工具。
1. **node-sass**:scss/sass打包转换器。

### 说明
* **antd**属于前端样式包，可以按照项目的需要更换成任意需要的内容。