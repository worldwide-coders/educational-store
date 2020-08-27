import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import { addToCart } from './cartFunctions'

const Cart = props => {
  const [cart, setCart] = useState({ items: [], priceTotal: 0, isPurchased: null })
  const [item, setItem] = useState({})
  const token = 'a1924fc83e0326332ffdc643dddd9760'
  const cartId = '5f4738bf61765a34032308c9'
  // const itemId = '5f46bfda96a3d15f7786b05f'
  const itemId = '5f456bc2af051cbda448d53c'

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

  const addToCart = (item, cart) => {
    const index = cart.items.findIndex(lineItem => { return lineItem.item === item._id })
    let localItem = cart.items[index]
    let totalPrice = cart.priceTotal
    const newItems = [...cart.items]
    if (!localItem) {
      localItem = { item: item, qty: 0, price: 0 }
    }
    localItem.qty++
    localItem.price = item.price * localItem.qty
    if (index !== -1) {
      newItems[index] = { item: item, price: localItem.price, qty: localItem.qty }
    } else {
      newItems.push({ item: item, price: localItem.price, qty: localItem.qty })
    }
    totalPrice += item.price
    updateCart({ items: newItems, priceTotal: totalPrice })
      .then(res => setCart(res.data.cart))
      .catch(console.error)
  }

  const removeOneFromCart = (item, cart) => {
    const index = cart.items.findIndex(lineItem => { return lineItem.item === item._id })
    const localItem = cart.items[index]
    let totalPrice = cart.priceTotal
    let newItems = []
    // if (!localItem) {
    //   localItem = { item: item, qty: 0, price: 0 }
    // }
    localItem.qty--
    localItem.price = item.price * localItem.qty
    console.log('qty', localItem.qty)
    if (localItem.qty === 0) {
      newItems = cart.items.splice(index, 1)
    } else {
      newItems = [...cart.items]
      newItems[index] = { item: item, price: localItem.price, qty: localItem.qty }
      // newItems.push({ item: item, price: localItem.price, qty: localItem.qty })
    }
    totalPrice -= item.price
    updateCart({ items: newItems, priceTotal: totalPrice })
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

  const itemList = cart.items.map(item => {
    if (item) {
      return (
        <li key={item._id}>
          {item.item.name}
          <span>Price: {item.price}</span>
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
    </div>
  )
}

export default Cart
