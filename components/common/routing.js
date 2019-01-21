import React from 'react'
import Router from 'next/router'
import {withRouter} from 'next/router'
import {generateSign, checkSign} from '../../util/routingTypeSing'

const RouteType = {
    Start: 'startRoute',
    Complete: 'complete',
};

/**
 * 用于检测当前路由方式的高阶组件
 * @returns {Function}
 */
const route = () => {
    return (OriginComp) => {
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
                        isPageRoute: state.pageRoute,
                        isLocalRoute: state.localRoute,
                        sign: generateSign
                    }
                }, this.props);
                return (<OriginComp {...params}/>)
            }
        })
    }
};

export default route