import uuid from 'uuid/v1'

export const generateSign = url =>{
    const id = uuid();
    if(url.match(/^\S\?\S$/)){
        return `${url}&route-tag=${id}`
    }else{
        return `${url}?route-tag=${id}`
    }
};

export const checkSign = url =>{
    return !!url.match(/^\S+route-tag=\S+$/);
};