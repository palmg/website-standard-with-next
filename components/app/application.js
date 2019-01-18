import React from 'react'
import {Layout} from 'antd';
import Router from 'next/router'
import Loading from './application/loading'
import Menu from './application/menu'

const {Header, Content, Footer} = Layout;
const cn = require('classnames/bind').bind(require('./application.scss'));

/**
 * 框架组件
 * @param props
 * @param props.onMenuClick {Function} 点击事件回调 (id, event)
 */
class Application extends React.Component {
    state = {loading: false};

    componentDidMount(){
        const {events} = Router;
        events.on('routeChangeStart', this.routeChangeStart);
        events.on('routeChangeComplete', this.routeChangeComplete);
    }

    routeChangeStart = (url) => {
        this.setState({loading:true})
    };

    routeChangeComplete = (url) => {
        this.setState({loading:false})
    };

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <Header style={{height: '46px'}}>
                    <Menu onMenuClick={this.handleMenuClick}/>
                </Header>
                <Content style={{position: 'relative', padding: '50px'}}>
                    {this.state.loading ? (<Loading/>) : this.props.children}
                </Content>
                <Footer style={{textAlign: 'center', background: '#001529', color: 'rgba(255, 255, 255, 0.65)'}}>
                    模板案例
                </Footer>
            </Layout>
        );
    }
}

export default Application