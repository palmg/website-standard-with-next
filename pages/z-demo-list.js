import React from 'react'
import Link from 'next/link'
import {loadTvList} from './z-demo-list/db'

class DemoList extends React.Component {
    static async getInitialProps() {
        const data = await loadTvList();
        return {
            shows: data
        }
    }

    componentDidMount() {
        loadTvList().then(data => {
            console.log(data)
        });
    }

    render() {
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