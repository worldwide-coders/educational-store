import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Cart = props => {
  const [cart, setCart] = useState({})
  const token = '42a6834da1e606be009e3c8c0ae65280'
  const cartId = '5f4690c2df51dfc5dfb80549'

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
  console.log(cart)
  console.log('user', token)
  return (
    <div>
      {cart.items}
      Total Price: ${cart.priceTotal}
    </div>
  )
}

export default Cart
