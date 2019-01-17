import React from 'react'
import {Menu as M} from 'antd';
import Link from "./link";
import {getMenus} from '../../data/menuData'

const {Item} = M;

const Menu = props => (
    <M theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        {props.menus.list.map(menu=>(
            <Item key={menu.key}>
                <Link href={menu.href} onClick={props.onMenuClick}>
                    {menu.name}
                </Link>
            </Item>
        ))}
    </M>
);

Menu.getInitialProps = async () => {
    const menus = await getMenus();
    return {menus}
};

export default Menu