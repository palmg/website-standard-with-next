const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
let count = 0;

if (typeof require !== 'undefined') {
    /**
     * 与antd整合时如果使用按需加载组件样式，服务端会报以下错误：
     *      "/work/palmg/website-standard-with-next/node_modules/antd/lib/style/index.css:6
     *      @font-face {
     *      Invalid or unexpected token"
     * 主要原因是加载器使用错误，用if语句中这一段代码可以修复。
     * @param file
     */
    require.extensions['.css'] = file => {}
}

module.exports = withCSS(withSass({
    distDir: 'dist', //工作&打包文件生成路径
    webpack: function (cfg, opt) {
        const originalEntry = cfg.entry;
        cfg.entry = async () => {
            const entries = await originalEntry();
            if (
                entries['main.js'] &&
                !entries['main.js'].includes('./config/polyfills.js')
            ) {
                entries['main.js'].unshift('./config/polyfills.js')
            }
            return entries
        };
        return cfg
    }
}));