/**
 * 模拟异步获取菜单
 */
import {Menus} from "../../../../data/menuData";

export const getMenus = () => {
    //可以将这个promise修改为一个net方法实现异步动态装菜菜单
    return new Promise((resolve, reject) => {
        resolve(Menus)
    })
};