# 前端样板工程

## 简介
用于其他业务项目的模板工程。

## Next配置
`next`以`${root}next.config.js`文件作为配置入口，所有的配置内容都在一个对象中：
```javascript 1.8
{
    distDir: 'dist',
    ebpack: function (cfg, opt) {returan cfg;}
}
```
以下都已key/value的形式说明参数。
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