import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Cart = props => {
    const [cart, setCart] = userState({})

    useEffect(() => {
        axios(`${apiUrl} /carts`)
            .then(res => setCart(res.data.carts))
            .catch(console.error)
    }, [])
    return (
        <div>
            {cart}
        </div>
    )
}

export default Cart