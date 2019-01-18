/**
 * 用于演示异步转同步的代码
 * @return {Promise<any>}
 */

function asyncLoadData() {
    return new Promise((resolv, reject)=>{
        const timer = setTimeout(()=>{
            resolv('Is A Data');
        }, 2000)
    })
}

async function async2Sync() {
    const value =  await asyncLoadData();
    return value;
}

(()=>{
    const value = async2Sync();
})();


async function async2SyncParamFoo(foo) {
    const value =  await foo();
    return value;
}

(()=>{
    const value = async2SyncParamFoo(asyncLoadData);
})();