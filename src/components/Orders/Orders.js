import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Orders extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our book state will be null, until the API request finishes
      carts: []
    }
  }
  //   const token = '28639d61d9e5348277258cc747610a9c'
  // runs when the component appears (is created and inserted into DOM)
  componentDidMount () {
    // make a request to get the book, with the current routes'id
    // axios(`${apiUrl}/items/${this.props.match.params.id}`)
    // ${this.props.user.token}
    axios({
      url: apiUrl + '/carts',
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ carts: res.data.carts })
      })
      .catch(console.error)
  }
  render () {
    const cartList = this.state.carts.map(cart => {
      const lineItems = cart.lineItems.map(lineItem => (
        <Fragment key={lineItem._id}>
          <div>Number of items: {lineItem.qty}</div>
          <div>Item description: {lineItem.item.name}</div>
        </Fragment>
      ))
      return (
        <div key={cart._id}>
          <h2>{lineItems}</h2>
          <h2>Price Total: {cart.priceTotal}<br/></h2>
        </div>
      )
    })
    return (
      <div>
        <h4>All orders</h4>
        <div className='container col-sm-12'>
          {cartList}
        </div>
      </div>
    )
  }
}

export default withRouter(Orders)
