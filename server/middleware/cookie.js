function pageCache(app, req, res, next) {
    `${req.url}`.match(/^\/_next\/\S+/) ? next() : writeCookie(app, req, res, next);
}

function writeCookie(app, req, res, next) {
    res.cookie('Test-Cookie', 'Test-Cookie', {maxAge: 600000});
    next();
}

module.exports = writeCookie;
