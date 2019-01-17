const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
let count = 0;
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