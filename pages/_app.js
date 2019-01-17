import React from 'react'
import Head from 'next/head'
import {LocaleProvider} from 'antd'; //antd国际化入口
import zh_CN from 'antd/lib/locale-provider/zh_CN'; //对应的国际化标签
import App, {Container} from 'next/app'
import Application from '../components/application'
import 'antd/dist/antd.css'

class ExpressApp extends App {
    static async getInitialProps({Component, router, ctx}) {
        /**
         * 这一段代码只会在server端运行
         */
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {pageProps}
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Head>
                    <title>title</title>
                    <meta charSet='utf-8'/>
                    <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                </Head>
                <LocaleProvider locale={zh_CN}>
                    <Application>
                        <Component {...pageProps} />
                    </Application>
                </LocaleProvider>
            </Container>
        )
    }
}

export default ExpressApp