const Menus = [
    {key: 'home', name: '首页', href: '/'},
    {key: 'about', name: '关于', href: '/about'},
    {key: 'load-demo', name: '异步读取案例', href: '/z-demo-list'},
];

//获取菜单
export const getMenus = () => {
    //可以将这个promise修改为一个net方法实现异步动态装菜菜单
    return new Promise((resolve, reject) => {
        resolve({
            defaultKey: 'home',
            list: Menus
        })
    })
};