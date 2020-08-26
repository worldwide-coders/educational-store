import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Cart = props => {
  const [cart, setCart] = useState({ items: [], priceTotal: 0, isPurchased: null })
  const token = 'c14a0ba1a7363853b57c3cecabec8326'
  const cartId = '5f4690c2df51dfc5dfb80549'

  useEffect(() => {
    axios({
      url: apiUrl + '/carts/' + cartId,
      headers: {
        'Authorization': `Token token=${props.user.token}`
        // 'Authorization': `Token token=${token}`
      }
    })
      .then(res => setCart(res.data.cart))
      .catch(console.error)
  }, [])

  const removeItem = (object) => {
    console.log('inside remove item', object)
  }

  console.log(cart.items)
  console.log('user', token)
  const itemList = cart.items.map(item => (
    <li key={item._id}>
      {item.name}
      Price: {item.price}
      <button onClick={event => removeItem(event)}>Remove Item</button>
    </li>
  ))
  return (
    <div>
      {itemList}
      Total Price: ${cart.priceTotal}
    </div>
  )
}

export default Cart
