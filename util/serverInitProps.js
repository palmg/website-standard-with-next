const FooDict = {};

export const registerAsyncFoo = (key, foo, params = {}) =>{
    FooDict[key] = {foo, params};
};

export const executeAsyncFoo = async () => {
    const valueDict = {};
    const keys = Object.keys(FooDict);
    for(let key of keys){
        const dict = FooDict[key];
        const value = await dict.foo(dict.params);
        valueDict[key] = value
    }
    return valueDict;
}