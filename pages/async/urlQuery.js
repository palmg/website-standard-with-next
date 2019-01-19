import React from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router'
import {List, Button} from 'antd'
import {loadTvList} from '../../components/async/standard/db'

const Group = Button.Group;

const DemoList = props => (<React.Fragment>
    <p>通过Url的query控制服务端加载</p>
    <Bar/>
    <List
        size="small"
        bordered
        dataSource={props.shows.map(i => i.show.name)}
        renderItem={item => (<List.Item>{item}</List.Item>)}
    />
</React.Fragment>);

DemoList.getInitialProps = async ({req, query}) => {
    const data = await loadTvList(query.q);
    return {shows: data}
};

const Bar = withRouter(props => {
    const {pathname} = props.router;
    return (<Group>
        <Button><Link href={`${pathname}?q=batman`}><a>batman</a></Link></Button>
        <Button><Link href={`${pathname}?q=child`}><a>child</a></Link></Button>
        <Button><Link href={`${pathname}?q=lahn`}><a>lahn</a></Link></Button>
    </Group>)})

export default DemoList