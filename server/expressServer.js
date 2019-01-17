const express = require('express')
const next = require('next')

const env = process.env.NODE_ENV !== 'production'
// 创建一个服务端运行的Next app
const app = next({env})
// 请求处理器
const handle = app.getRequestHandler();
app.prepare()
    .then(() => {
        const server = express();

        server.get('*', (req, res) => {
            return handle(req, res)
        });
        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1)
    })