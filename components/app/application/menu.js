import React from 'react'
import {Menu as M} from 'antd';
import Link from "next/link";
import {withRouter} from "next/router";
import {getMenus} from './menu/db'
import serverPreload from '../../common/serverPreload'

const {Item} = M;

const Menu = props => {
    const {menus} = props,
        {pathname} = props.router;
    return (<M theme="dark"
               mode="horizontal"
               defaultSelectedKeys={
                   menus.filter(menu => menu.href.replace(/\?[a-zA-Z0-9=]+/, '') === pathname).map(menu => menu.key)
               }>
        {menus.map(menu => (
            <Item key={menu.key}>
                <Link href={menu.href}>
                    <a>{menu.name}</a>
                </Link>
            </Item>
        ))}
    </M>);
};

export default serverPreload('menus', getMenus)(withRouter(Menu))