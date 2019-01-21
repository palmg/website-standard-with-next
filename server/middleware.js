/**
 * 标准的中间件接口案例
 */

// class Middleware {//类实现
//     constructor(app){
//         this.app = app;
//     }
//
//     /**
//      * 中间执行方法
//      * @param req request
//      * @param res response
//      * @return {Boolean} 返回true表示继续执行下一个中间件，返回false表示不再执行
//      */
//     run(req, res){
//         //Do
//         //req.send()
//         //this.app.renderToHTML(req, res, url.replace(/\?\S+$/, ''), req.query)
//         //this.app.renderError(err, req, res, url, req.params);
//         //etc.
//     }
// }

function Middleware(app) {//方法实现
    this.app = app;
}

/**
 *
 * @param res
 * @param req
 * @return {Boolean} 返回true表示继续执行下一个中间件，返回false表示不再执行
 */
Middleware.prototype.run = function (res, req, next) {
    //Do
    //req.send()
    //this.app.renderToHTML(req, res, url.replace(/\?\S+$/, ''), req.query)
    //this.app.renderError(err, req, res, url, req.params);
    //etc.
};

module.exports = Middleware