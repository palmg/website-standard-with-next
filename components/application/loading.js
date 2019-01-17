import React from "react";
import {Spin} from "antd";
const cn = require('classnames/bind').bind(require('./loading.scss'));

class Loading extends React.Component {
    state = {dots: 0};

    setDots = () => {
        const {dots} = this.state;
        this.setState({dots: (dots + 1) % 12})
    };

    componentDidMount() {
        this.timer = setInterval(this.setDots, 260);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const {dots} = this.state;
        let dotStr = '', count = 0;
        while (count++ < dots) {
            dotStr += '.'
        }
        return (<div className={cn('loading')}>
            <p className={cn('loading-title')}>数据加载中{dotStr}</p>
            <Spin size="large"/>
        </div>)
    }
}

export default Loading