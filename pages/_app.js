import React from 'react'
import Head from 'next/head'
import {LocaleProvider} from 'antd'; //antd国际化入口
import zh_CN from 'antd/lib/locale-provider/zh_CN'; //对应的国际化标签
import App, {Container} from 'next/app'
import Application from '../components/app/application'
import ApplicationContext from '../components/app/applicationContext'
import {executeAsyncFoo} from "../util/serverInitProps";
import {info} from '../util/log'

class ExpressApp extends App {
    constructor(...props) {
        super(...props);
        info('Execute _App constructor()!', 'executeReport');
    }

    static async getInitialProps({Component, router, ctx}) {
        info('Execute _App getInitialProps()!', 'executeReport');
        /**
         * app的getInitialProps会在服务端被调用一次，在前端每次切换页面时被调用。
         */
        let pageProps = {}, appProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        if (ctx && !ctx.req) {//前端,只有在服务端 ctx.req 和 ctx.res 才存在
            appProps = window.__NEXT_DATA__.props.appProps;
        } else {//服务端
            appProps = await executeAsyncFoo();
        }
        return {pageProps, appProps}
    }

    render() {
        info('Execute _App render()!', 'executeReport');
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