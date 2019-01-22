import React from 'react'
import Link from '../../components/common/route/link'
import {List, Button} from 'antd'
import {loadTvList} from '../../components/async/standard/db'
import routing from '../../components/common/route/routing'
import Loading from '../../components/app/application/loading'

const Group = Button.Group;

const DemoList = props => (<React.Fragment>
    <p>通过Url的query控制服务端加载</p>
    <OptionAndData shows={props.shows}/>
</React.Fragment>);

const OptionAndData = routing(props => (<React.Fragment>
    <Bar route={props.route}/>
    <List
        size="small"
        bordered
        dataSource={props.shows.map(i => i.show.name)}
        renderItem={item => (<List.Item>{item}</List.Item>)}
    />
    {props.route.isLocalRoute && (<Loading />)}
</React.Fragment>))


DemoList.getInitialProps = async ({req, query}) => {
    const data = await loadTvList(query.q);
    return {shows: data}
};

const Bar = props => {
    const {pathname} = props.route;
    return (<Group>
        <Button><Link href={`${pathname}?q=batman`}><a>batman</a></Link></Button>
        <Button><Link href={`${pathname}?q=child`}><a>child</a></Link></Button>
        <Button><Link href={`${pathname}?q=lahn`}><a>lahn</a></Link></Button>
    </Group>)
}

export default DemoList