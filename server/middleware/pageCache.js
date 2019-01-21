const LRUCache = require('lru-cache')

//TODO
const LRUCacheOptions = {
    max: 50, //存储空间
    maxAge: 30 * 100000 * 1000,//单条数据如果没有遇到直接移除的情况最大缓存时间
    length: function (n, key) {
        return n * 2 + key.length;
    }
}

function Cache() {
    this.cache = new LRUCache(LRUCacheOptions)
}

Cache.prototype.getCacheValue = function (key) {
    return this.cache.get(key)
};

Cache.prototype.setCacheValue = function (key, value) {
    this.cache.set(key, value);
};

Cache.prototype.hasKey = function (key) {
    return this.cache.has(key)
}

const pageCache = new Cache();

const getPageCache = function () {
    return pageCache;
}
module.exports = getPageCache;