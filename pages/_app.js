import React from 'react'
import Head from 'next/head'
import {LocaleProvider} from 'antd'; //antd国际化入口
import zh_CN from 'antd/lib/locale-provider/zh_CN'; //对应的国际化标签
import App, {Container} from 'next/app'
import Application from '../components/application'
import ApplicationContext from '../components/applicationContext'
import {executeAsyncFoo} from "../util/serverInitProps";

class ExpressApp extends App {
    constructor(...props) {
        console.log('App constructor');
        super(...props);
    }

    static async getInitialProps({Component, router, ctx}) {
        console.log('App getInitialProps execute!');
        /**
         * app的getInitialProps会在服务端被调用一次，在前端每次切换页面时被调用。
         */
        let pageProps = {}, appProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        if (ctx && !ctx.req) {//前端,只有在服务端 ctx.req 和 ctx.res 才存在
            console.log('Client. request:', ctx.req, '. response:', ctx.res);
            appProps = window.__NEXT_DATA__.props.appProps;
        } else {//服务端
            console.log('Server request cookie:',  ctx.req.headers.cookie);
            appProps = await executeAsyncFoo();
        }
        return {pageProps, appProps}
    }

    render() {
        console.log('App render execute!');
        const {Component, pageProps, appProps} = this.props;
        return (
            <Container>
                <Head>
                    <title>title</title>
                    <meta charSet='utf-8'/>
                    <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                </Head>
                <LocaleProvider locale={zh_CN}>
                    <ApplicationContext.Provider value={appProps}>
                        <Application>
                            <Component {...pageProps} />
                        </Application>
                    </ApplicationContext.Provider>
                </LocaleProvider>
            </Container>
        )
    }
}

export default ExpressApp