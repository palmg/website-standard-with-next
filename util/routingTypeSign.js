const Flag = 'establish'
export const generateSign = url =>{
    if(url.match(/^\S+\?\S+$/)){
        return `${url}&route-tag=${Flag}`
    }else{
        return `${url}?route-tag=${Flag}`
    }
};

export const checkSign = url =>{
    return !!url.match(/^\S+route-tag=\S+$/);
};