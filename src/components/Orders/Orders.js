import React, { Component, Fragment } from 'react'
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import './Orders.css'

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
        <div className="container" key={cart._id}>
          <Card className="row">
            <Card.Body>
              <Card.Title>Price Total: {cart.priceTotal}</Card.Title>
              <Card.Text>
                {lineItems}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )
    })
    return (
      <div>
        <h4>All orders</h4>
        <div className='container col-sm-12'>
          {cartList.reverse()}
        </div>
      </div>
    )
  }
}

export default withRouter(Orders)
