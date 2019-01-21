const express = require('express')
const next = require('next')
const getPageCache = require('./middleware/pageCache')

const env = process.env.NODE_ENV !== 'production'
// 创建一个服务端运行的Next app
const app = next({env})
// 请求处理器
const handle = app.getRequestHandler();
const pageCache = getPageCache();
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare()
    .then(() => {
        const server = express();
        server.get('*', (req, res) => {
            const url = `${req.url}`;
            if (!url.match(/^\S+(\.js|\.css)$/)) {//对页面进行缓存处理的案例
                processPage(url, req, res);
            }
            return handle(req, res)
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`)
        })
    }).catch((ex) => {
    console.error(ex.stack);
    process.exit(1)
});

const getRequestCacheKey = (req) => {
    return `${req.url}`;
};

const processPage = async (url, req, res) => {
    const cacheKey = getRequestCacheKey(req),
        cacheValue = pageCache.getCacheValue(cacheKey);
    res.cookie('Test-Cookie', 'Test-Cookie', {maxAge: 600000});
    if (cacheValue) {
        res.setHeader('X-Hit-Cache', 'Yes');
        res.send(cacheValue)
    } else {
        res.setHeader('X-Hit-Cache', 'No');
        try {
            const value = await app.renderToHTML(req, res, url.replace(/\?\S+$/, ''), req.query);
            pageCache.setCacheValue(cacheKey, value);
        } catch (err) {
            console.error(err);
            app.renderError(err, req, res, url, req.params);
        }
    }
    return;
};