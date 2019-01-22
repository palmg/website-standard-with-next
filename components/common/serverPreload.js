import React from 'react'
import {registerAsyncFoo} from '../../util/serverInitProps'
import ApplicationContext from '../app/applicationContext'

const serverPreload = (key, foo) => {
    registerAsyncFoo(key, foo);
    return OriginComp => {
        return props => (
            <ApplicationContext.Consumer>
                {appProps => {
                    const params = Object.assign({}, props);
                    params[key] = appProps[key];
                    return (<OriginComp {...params}/>)
                }}
            </ApplicationContext.Consumer>)
    }
};

export default serverPreload