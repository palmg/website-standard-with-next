const Flag = 'executeReport';

export const info = (msg, flag) => Flag === flag && console.log(msg);