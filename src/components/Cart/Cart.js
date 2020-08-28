import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import { addToCart } from './cartFunctions'
import checkoutModal from '.../sdfj'

const Cart = props => {
  const [cart, setCart] = useState({ lineItems: [], priceTotal: 0, isPurchased: null })
  const [item, setItem] = useState({})
  const token = '66415b6848b64a2d54d618a94eaa5239'
  const cartId = '5f47dfc3229c9465ad8b93c3'
  // const itemId = '5f47cf884750eb568367fb5c'
  const itemId = '5f47d3994750eb568367fb5e'

  useEffect(() => {
    axios({
      url: apiUrl + '/carts/' + cartId,
      headers: {
        // 'Authorization': `Token token=${props.user.token}`
        'Authorization': `Token token=${token}`
      }
    })
      .then(res => setCart(res.data.cart))
      .catch(console.error)
  }, [])
  // For tests
  useEffect(() => {
    axios({
      url: apiUrl + '/items/' + itemId,
      headers: {
        // 'Authorization': `Token token=${props.user.token}`
        'Authorization': `Token token=${token}`
      }
    })
      .then(res => setItem(res.data.item))
      .catch(console.error)
  }, [])

  // Increase cart item by one
  const addToCart = (item, cart) => {
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
      newLineItems[index] = { item: item, price: lineItem.price, qty: lineItem.qty }
    } else {
      newLineItems.push({ item: item, price: lineItem.price, qty: lineItem.qty })
    }
    // Calls helper function to run axios call about the change to cart
    // Sets local cart to the response data of newly updated cart
    updateCart({ lineItems: newLineItems, priceTotal: totalPrice })
      .then(res => setCart(res.data.cart))
      .catch(console.error)
  }

  // Decreases cart item by one
  const removeOneFromCart = (item, cart) => {
    // Looks for the index of the item we are looking to decrease
    const index = cart.lineItems.findIndex(lineItem => { return lineItem.item._id === item._id })
    const lineItem = cart.lineItems[index]
    let totalPrice = cart.priceTotal
    let newLineItems = []
    // Decreases quanity and price for the line item
    lineItem.qty--
    lineItem.price = item.price * lineItem.qty
    totalPrice -= item.price
    console.log('qty', lineItem.qty)
    // If quanity of an item drops to 0 remove line item from the array
    // Otherwise grab previous array and update that line item
    if (lineItem.qty === 0) {
      newLineItems = cart.lineItems.splice(index, 1)
    } else {
      newLineItems = [...cart.lineItems]
      newLineItems[index] = { item: item, price: lineItem.price, qty: lineItem.qty }
      // newItems.push({ item: item, price: localItem.price, qty: localItem.qty })
    }
    // Calls helper function to run axios call about the change to cart
    // Sets local cart to the response data of newly updated cart
    updateCart({ lineItems: newLineItems, priceTotal: totalPrice })
      .then(res => setCart(res.data.cart))
      .catch(console.error)
  }

  const updateCart = (cart) => {
    return (axios({
      url: apiUrl + '/carts/' + cartId,
      method: 'PATCH',
      headers: {
        // 'Authorization': `Token token=${props.user.token}`
        'Authorization': `Token token=${token}`
      },
      data: {
        cart: cart
      }
    }))
  }

  // Generates a list if items in cart
  const itemList = cart.lineItems.map(line => {
    if (line) {
      return (
        <li key={line._id}>
          {line.item.name}
          <span>Price: {line.price}</span>
          {/* <button onClick={event => removeItem(event)}>Remove Item</button> */}
        </li>
      )
    }
  })
  console.log('stat ie ', cart)
  return (
    <div>
      {itemList}
      Total Price: ${cart.priceTotal}
      <button onClick={() => console.log(addToCart(item, cart))}>Increase Item</button>
      <button onClick={() => console.log(removeOneFromCart(item, cart))}>Decrease Item</button>
      <button onClick>Checkout</button>
    </div>
  )
}

export default Cart
