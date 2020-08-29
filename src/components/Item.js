import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
// import Layout from './shared/Layout/Layout'
import CartButton from './shared/Buttons/CartButton'

import messages from './AutoDismissAlert/messages'

// import the api's url
import apiUrl from '../apiConfig'

// Import axios so we can make HTTP requests
import axios from 'axios'

class Item extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our book state will be null, until the API request finishes
      item: {},
      addedToCart: false
    }
  }
  //   const token = '28639d61d9e5348277258cc747610a9c'
  // runs when the component appears (is created and inserted into DOM)
  componentDidMount () {
    // make a request to get the book, with the current routes'id
    // axios(`${apiUrl}/items/${this.props.match.params.id}`)
    // ${this.props.user.token}
    axios({
      url: apiUrl + `/items/${this.props.match.params.id}`
      // headers: {
      //   'Authorization': `Token token=${this.props.user.token}`
      // }
    })

    // set the `book` state to the `book` data we got back from the response (res.data.book)

      .then(res => {
        this.setState({ item: res.data.item })
      })
      .catch(console.error)
  }

  //   destroyItem = () => {
  //     axios({
  //       url: `${apiUrl}/items/${this.props.match.params.id}`,
  //       method: 'DELETE'
  //     })
  //       // update their `deleted` state to be `true`
  //       .then(() => this.setState({ deleted: true }))
  //       .catch(console.error)
  //   }

  // THE FOLLOWING SNIP WAS REMOVED FROM INSIDE THE RENDER:
  // ******************************
  // if the deleted state is true
  // if (deleted) {
  //     // redirect to the home page
  //     return <Redirect to={{
  //       // Redirect to the home page ('/')
  //       pathname: '/',
  //       // Pass along a message, in state, that we can show
  //       state: { message: 'Deleted book successfully' }
  //     }} />
  //   }
  //   <button onClick={this.destroyBook}>Delete Book</button>
  //   {/* Add a link to the edit item route when you click the edit button */}
  /* <Link to={`/items/${this.props.match.params.id}/edit`}> */
  /* <button>Edit</button> */
  // </Link>
  // *********************************

  // Increase cart item by one
  addToCart = (item, cart) => {
    const { msgAlert } = this.props

    // Looks for the index of the item we are looking to increase
    const index = cart.lineItems.findIndex(lineItem => { return lineItem.item._id === item._id })
    // Grabs the line item if it exists, otherwise this will be undefined
    let lineItem = cart.lineItems[index]
    let totalPrice = cart.priceTotal
    // Creates a new array of line items
    const newLineItems = [...cart.lineItems]
    // If item doesn't exist in the cart we are going to create a new line item
    if (!lineItem) {
      lineItem = { item: item, qty: 0, price: 0 }
    }
    // Increasing quanity and price for the line item
    lineItem.qty++
    lineItem.price = item.price * lineItem.qty
    totalPrice += item.price
    // Index will be -1 if we item doesn't exist in cart yet
    // If its not -1 we'll update the line item of that index
    // Otherwise we push a new item to the arry of items
    if (index !== -1) {
      newLineItems[index] = { item: item, price: lineItem.price.toFixed(2), qty: lineItem.qty }
    } else {
      newLineItems.push({ item: item, price: lineItem.price.toFixed(2), qty: lineItem.qty })
    }
    // Calls helper function to run axios call about the change to cart
    // Sets local cart to the response data of newly updated cart
    this.updateCart({ lineItems: newLineItems, priceTotal: totalPrice.toFixed(2) })
      .then(res => this.props.setCart(res.data.cart))
      .then(() => msgAlert({
        heading: `Added ${item.name} to cart successfully!`,
        message: messages.addToCartSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Add to Cart failed with error: ' + error.message,
          message: messages.addToCartFailure,
          variant: 'danger'
        })
      })
  }

  updateCart = (cart) => {
    return (axios({
      url: apiUrl + '/carts/' + this.props.cart._id,
      method: 'PATCH',
      headers: {
        // 'Authorization': `Token token=${props.user.token}`
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        cart: {
          lineItems: cart.lineItems,
          priceTotal: cart.priceTotal
        }
      }
    }))
  }

  render () {
    // destructure our book property out of state
    const { item, addedToCart } = this.state

    // if we don't have an item (item is empty object)
    if (!item) {
      return <p>Loading...</p>
    }
    if (addedToCart) {
      //  if addedToCart is true,
      return <Redirect to={{
        // Redirect to the items page ('/')
        pathname: '/items',
        // Pass along a message, in state, that we can show
        state: { message: 'Item was added to your cart successfully' }
      }} />
    }

    return (
      <div>
        <h4>Name: {item.name}</h4>
        <p>Price: {item.price}</p>
        <CartButton addToCart={() => this.addToCart(item, this.props.cart)} />
        <Link to='/items'>Back to all items</Link>
      </div>
    )
  }
}

export default withRouter(Item)
