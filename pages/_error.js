import React from 'react'

const Error = props =>(<div>错误：{props.statusCode}</div>);

Error.getInitialProps = async ({res})=>{
    return {statusCode:res.statusCode}
};

export default Error