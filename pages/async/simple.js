import React from 'react'

const load = async () =>{
    return new Promise((res, rej)=>{
        res('Success')
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