import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const CreateCart = props => {
  console.log('does this work')
  useEffect(() => {
    console.log('made it here')
    axios({
      url: apiUrl + '/carts',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        console.log('created cart', res)
        props.history.push('/')
      })
      .catch(console.error)
  })
  return (
    <Fragment>
    </Fragment>
  )
}

export default withRouter(CreateCart)
