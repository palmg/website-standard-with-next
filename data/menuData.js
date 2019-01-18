const Menus = [
    {key: 'home', name: '首页', href: '/'},
    {key: 'about', name: '关于', href: '/about'},
    {key: 'load', name: '简单异步执行', href: '/async/simple'},
    {key: 'load-demo', name: '远程异步读取', href: '/async/standard'},
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