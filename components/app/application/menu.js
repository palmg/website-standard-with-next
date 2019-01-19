import React from 'react'
import {Menu as M} from 'antd';
import Link from "next/link";
import {withRouter} from "next/router";
import ApplicationContext from '../applicationContext'
import {registerAsyncFoo} from '../../../util/serverInitProps'
import {getMenus} from './menu/db'

const {Item} = M;
registerAsyncFoo('menus', getMenus);

const Menu = props => {
    return (
        <ApplicationContext.Consumer>
            {appProps => {
                const {menus} = appProps,
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
                </M>)
            }}
        </ApplicationContext.Consumer>
    );
};

export default withRouter(Menu)