import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const CreateCart = props => {
  useEffect(() => {
    axios({
      url: apiUrl + '/carts',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
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
