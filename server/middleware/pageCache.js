/**
 * 数据缓存案例
 * @type {LRUCache}
 */
const LruCache = require('lru-cache')

//TODO
const LRUCacheOptions = {
        max: 50, //存储空间
        maxAge: 30 * 100000 * 1000,//单条数据如果没有遇到直接移除的情况最大缓存时间
        length: function (n, key) {
            return n * 2 + key.length;
        }
    },
    cache = new LruCache(LRUCacheOptions);

function getRequestCacheKey(req) {
    return `${req.url}`;
};

function pageCache(app, req, res, next) {
    `${req.url}`.match(/^\/_next\/\S+/) ? next() : renderAndCache(app, req, res);
}

async function renderAndCache(app, req, res) {
    const key = getRequestCacheKey(req),
        value = cache.get(key),
        url = `${req.url}`;
    if (value) {
        res.setHeader('X-Hit-Cache', 'Yes');
        res.send(value)
    } else {
        res.setHeader('X-Hit-Cache', 'No');
        try {
            const value = await app.renderToHTML(req, res, url.replace(/\?\S+$/, ''), req.query);
            cache.set(key, value);
            res.send(value);
        } catch (err) {
            console.error(err);
            app.renderError(err, req, res, url, req.params);
        }
    }
}

module.exports = pageCache;