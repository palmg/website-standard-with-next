import React from 'react'
import {List, Button} from 'antd'
import {loadTvList} from '../../components/async/standard/db'

const Group = Button.Group;

class DemoList extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {shows: this.props.shows};
        this.handleClick = this.handleClick.bind(this);
        this.setData = this.setData.bind(this);
    }

    /**
     * getInitialProps方法只能在pages组件中使用
     * @return {Promise<{shows: *}>}
     */
    static async getInitialProps({req, query}) {
        const isServer = !!req; //这是一个在管理案例中写的判断是否为服务器运行的方法
        const data = await loadTvList('batman');
        return {
            shows: data
        }
    }

    setData(shows) {
        this.setState({shows})
    }

    handleClick(e) {
        loadTvList('' + e.target.innerText.replace(/ /g, '')).then(this.setData);
    }

    render() {
        return (<React.Fragment>
            <p>通过组件的state控制服务端加载</p>
            <Group>
                <Button onClick={this.handleClick}>batman</Button>
                <Button onClick={this.handleClick}>child</Button>
                <Button onClick={this.handleClick}>lahn</Button>
            </Group>
            <List
                size="small"
                bordered
                dataSource={this.state.shows.map(i => i.show.name)}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </React.Fragment>)
    }
}

export default DemoList