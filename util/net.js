import fetch from 'isomorphic-unfetch'

export const net = function (url, data) {
    const options = {
        method: 'undefined' === typeof data ? 'GET' : 'POST'
    };
    return new Promise((resolve, reject) => {//(suc, err)
        fetch(url, options).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                reject({code: res.status, msg: `${res.type}:${res.statusText}`});
            }
        }).then(data => {
            //TODO 在这里处理数据
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    });
};