import React from 'react'
import OriLink from 'next/link'
import {generateSign} from '../../../util/routingTypeSign'

/**
 * ’next/link‘标签扩展，用于适应本地跳转
 * @param props
 * @return {*}
 * @constructor
 */
const Link = props => {
    const href = generateSign(props.href),
        params = Object.assign({}, props, {href});
    return <OriLink {...params}/>
}

export default Link