import React from 'react'
import Link from 'next/link'
import {loadTvList} from './z-demo-list/db'

class DemoList extends React.Component {
    constructor(...props) {
        console.log('Component constructor');
        super(...props);
    }

    /**
     * getInitialProps方法只能在pages组件中使用
     * @return {Promise<{shows: *}>}
     */
    static async getInitialProps({req, query}) {
        console.log('Component getInitialProps');
        const isServer = !!req; //这是一个在管理案例中写的判断是否为服务器运行的方法

        const data = await loadTvList();
        return {
            shows: data
        }
    }

    componentDidMount() {
    }

    render() {
        console.log('Component render');
        return (<React.Fragment>
            <p>异步请求测试</p>
            <ul>
                {this.props.shows.map(({show}) => (
                    <li key={show.id}>
                        <div>{show.name}</div>
                    </li>
                ))}
            </ul>
        </React.Fragment>)
    }
}

export default DemoList