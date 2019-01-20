const FooDict = {};

//注册方法
export const registerAsyncFoo = (key, foo, params = {}) => {
    FooDict[key] = {foo, params};
};

//获取方法
export const executeAsyncFoo = async () => {
    const valueDict = {};
    const keys = Object.keys(FooDict);
    for (let key of keys) {
        const dict = FooDict[key];
        valueDict[key] = await dict.foo(dict.params);
    }
    return valueDict;
};