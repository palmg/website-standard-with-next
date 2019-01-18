import React from 'react'

const load = async () =>{
    return new Promise((res, rej)=>{
        const timer = setTimeout(()=>{
            res('Success');
            clearTimeout(timer);//延迟效果
        }, 4000);
    })
}

class Simple extends React.Component{
    static async getInitialProps({req, query}) {
        const data = await load();
        return {data}
    }

    render() {
        return(<p>{this.props.data}</p>)
    }
}

export default Simple;