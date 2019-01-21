import React from 'react'
import Router from 'next/router'
import {withRouter} from 'next/router'
import {generateSign, checkSign} from '../../util/routingTypeSing'

const RouteType = {
    Start: 'startRoute',
    Complete: 'complete',
};

/**
 * 用于检测当前路由方式的高阶组件,会通过props向子组件注入路由相关的信息。
 * const YourComponent = props => {
 *      const {route} = props.route; //route 对象
 *      route.pathname; //当前浏览器的 url（不携带query参数）
 *      route.isPageRoute //{Boolean} 标记当前路由切换是否为内页切换
 *      route.isLocalRoute //{Boolean} 标记当前路由切换是否为组件内部切换
 *      route.sign //{Function} 路由签名方法，对当前跳转进行签名标记为Local Route
 *      return (<Link href={route.sign(pathname)}><a>link</a></Link>);
 * }
 * @param OriginComp {React.Component} 子组件
 * @returns {Function}
 */
const route = OriginComp => {
    return withRouter(class extends React.Component {
        state = {pageRoute: false, localRoute: false};

        componentDidMount() {
            const {events} = Router;
            events.on('routeChangeStart', this.routeChangeStart);
            events.on('routeChangeComplete', this.routeChangeComplete);
        }

        routeChangeStart = (url) => {
            const check = checkSign(url);
            this.setState({pageRoute: !check, localRoute: check})
        };

        routeChangeComplete = (url) => {
            this.setState({pageRoute: false, localRoute: false})
        };

        render() {
            const {pathname} = this.props.router, {state} = this, params = Object.assign({
                route: {
                    pathname,
                    isPageRoute: state.pageRoute,
                    isLocalRoute: state.localRoute,
                    sign: generateSign
                }
            }, this.props);
            delete params.router;
            return (<OriginComp {...params}/>)
        }
    })
};

export default route