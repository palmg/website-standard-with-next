import React from 'react'
import Error from 'next/error'

const ShowErrorPage = props => (<Error statusCode={308} />);

export default ShowErrorPage