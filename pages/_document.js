import Document, {Head, Main, NextScript} from 'next/document'
import React from "react";
import {executeAsyncFoo} from '../util/serverInitProps'

const writeCookie = ()=>{
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + 8000000);
    return `document.cookie="text-cookie=text-cookie-value;expires=${exdate.toGMTString()}"`
}

/**
 * 1. 仅用于构建整体html文档,如果没有_document.js文件，nextjs会自动产生。
 * 2. 仅仅会在服务端运行，所以切记不要将事件等功能写在这里
 * 3. 通常用于常规静态样式构建.
 */
export default class DocumentExt extends Document {
    constructor() {
        super();
        console.log('DocumentExt constructor');
    }

    static async getInitialProps(ctx) {
        /**
         * 这一段代码会在每一个终端第一次访问时在服务端渲染执行一次。
         * 例如浏览器打开当前网站或者刷新页面。可以将一些与单个用户相关的数据在这里注入到页面上。
         */
        const initialProps = await Document.getInitialProps(ctx);
        console.log('Document getInitialProps');
        return {...initialProps}
    }

    render() {
        console.log('Document render');
        return (
            <html>
                <Head>
                    <style>{'#__next{height:100%;}'}</style>
                    <script dangerouslySetInnerHTML={{__html:writeCookie()}}/>
                </Head>
                <body className="custom_class">
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}