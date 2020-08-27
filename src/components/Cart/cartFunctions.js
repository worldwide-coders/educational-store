import axios from 'axios'
import apiUrl from '../../apiConfig'

// temp variables
const token = 'a1924fc83e0326332ffdc643dddd9760'
const cartId = '5f4738bf61765a34032308c9'

export const addToCart = (item, cart) => {
  const index = cart.items.findIndex(x => { return x.item === item._id })
  let localItem = cart.items[index]
  let totalPrice = cart.priceTotal
  const newItems = [...cart.items]
  // let newCart = {}
  if (!localItem) {
    // console.log('This isntÎ in our cart')
    localItem = { item: item, qty: 0, price: 0 }
  }
  localItem.qty++
  localItem.price = item.price * localItem.qty
  // console.log('index', index, localItem.qty)
  if (index !== -1) {
    newItems[index] = { item: item, price: localItem.price, qty: localItem.qty }
  } else {
    newItems.push({ item: item, price: localItem.price, qty: localItem.qty })
  }
  totalPrice += item.price
  // setCart({ items: newItems, priceTotal: totalPrice })
  updateCart({ items: newItems, priceTotal: totalPrice })
    .then(res => { res.data.cart })
    .catch(console.error)
  console.log(newCart)
  // return newCart
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
