import Document, {Head, Main, NextScript} from 'next/document'
import UaParser from 'ua-parser-js'
import React from "react";

/**
 * 1. 仅用于构建整体html文档,如果没有_document.js文件，nextjs会自动产生。
 * 2. 仅仅会在服务端运行，所以切记不要将事件等功能写在这里
 * 3. 通常用于常规静态样式构建.
 */
export default class DocumentExt extends Document {
    constructor() {
        super();
    }

    static async getInitialProps(ctx) {
        /**
         * 这一段代码会在每一个终端第一次访问时在服务端渲染执行一次。
         * 例如浏览器打开当前网站或者刷新页面。可以将一些与单个用户相关的数据在这里注入到页面上。
         */
        const initialProps = await Document.getInitialProps(ctx),
            ua = UaParser(ctx.req.headers['user-agent']),
            {browser} = ua,
            major = parseInt(browser.major);
        initialProps.browser = {name:browser.name, major};
        return {...initialProps}
    }

    render() {
        const {browser} = this.props;
        return (
            <html>
                <Head>
                    <style>{'#__next{height:100%;}'}</style>
                </Head>
                <body className="custom_class">
                    <Main/>
                    {!('IE' === browser.name && 11 > browser.major) && (<NextScript />)}
                </body>
            </html>
        )
    }
}