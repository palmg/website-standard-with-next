import React from 'react'
import PropTypes from 'prop-types';
import Link from './application/link';
import Loading from './application/loading'
import Menu from './application/menu'
import {Layout} from 'antd';
const {Header, Content, Footer} = Layout;
const cn = require('classnames/bind').bind(require('./application.scss'));

/**
 * 框架组件
 * @param props
 * @param props.onMenuClick {Function} 点击事件回调 (id, event)
 */
class Application extends React.Component {
    state = {loading: false, children: this.props.children};

    handleMenuClick = (id, e) => {
        this.setState({loading: true});
    };

    static getDerivedStateFromProps(props, state) {
        if (props.children !== state.children) {
            return {children: props.children, loading: false}
        } else {
            return {loading: state.loading};
        }
    }

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
                    展示案例
                </Footer>
            </Layout>
        );
    }
}

Link.propTypes = {
    onMenuClick: PropTypes.func
};

export default Application