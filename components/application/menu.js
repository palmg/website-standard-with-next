import React from 'react'
import {Menu as M} from 'antd';
import Link from "./link";
import ApplicationContext from '../applicationContext'
import {registerAsyncFoo} from '../../util/serverInitProps'
import {getMenus} from '../../data/menuData'

const {Item} = M;
registerAsyncFoo('menus', getMenus);

const Menu = props => {
    return (
        <ApplicationContext.Consumer>
            {appProps => (<M theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                {appProps.menus.list.map(menu => (
                    <Item key={menu.key}>
                        <Link href={menu.href} onClick={props.onMenuClick}>
                            {menu.name}
                        </Link>
                    </Item>
                ))}
            </M>)}
        </ApplicationContext.Consumer>
    );
};

export default Menu