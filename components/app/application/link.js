import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'

/**
 * 自定义link组件
 * @param props {Object}
 * @param props.id {String} 编码
 * @param props.onClick {Function} 点击事件回调 (id, event)
 * @param props.router {String} 路由高阶组件
 * @param props.href {String} 跳转地址
 * @param props.children {Object} 子组件
 */
class LinkComp extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {props} = this;
        if (props.href !== props.router.route) {
            props.onClick && props.onClick(props.id, e);
            props.router.push(props.href)
        }
    };

    render() {
        //为React渲染之后的对象生成一个合并了新增属性的对象
        const {children} = this.props, props = {onClick: this.handleClick};
        return typeof children === 'string' ? React.createElement("a", props, children) : React.cloneElement(React.Children.only(this.props.children), props);
    }
}

Link.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    href: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};

export default Link