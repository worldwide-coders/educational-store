import React, { useState, useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import { createCart } from '../../api/auth'

// import { ELEMENTS_OPTIONS } from './CheckoutStyles'
import { CardField, Field, SubmitButton, ErrorMessage, ResetButton } from './CheckoutObjects'
import './CheckoutForm.css'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const CheckoutForm = props => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: ''
  })

  // const [succeeded, setSucceeded] = useState(false)
  // const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
  // Create PaymentIntent as soon as the page loads
    axios({
      url: apiUrl + '/create-payment-intent',
      method: 'POST',
      data: {
        cartId: props.cart._id,
        currency: 'usd'
      }
    })
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }
    if (error) {
      elements.getElement('card').focus()
      return
    }
    if (cardComplete) {
      setProcessing(true)
    }

    // To Stripe's site
    // const payload = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    //   billing_details: billingDetails
    // })

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
      .then(res => {
        const newCart = props.cart
        newCart.isPurchased = true
        axios({
          url: apiUrl + '/carts/' + props.cart.id,
          method: 'PATCH',
          headers: {
            'Authorization': `Token token=${props.user.token}`
          },
          data: {
            cart: newCart
          }
        })
          .then(() => createCart(props.user))
          .then(res => props.setCart(res.data.cart))
        return res
      })
      // const newCart = props.cart
    // console.log(newCart.isPurchased))
    // .then(() => createCart(props.user))
    // .then(res => props.setCart(res.data.cart))
    // console.log('this is the payload', payload)
    setProcessing(false)

    if (payload.error) {
      setError(payload.error)
    } else {
      console.log('did we make it here? ', payload.paymentIntent)
      setPaymentMethod(payload.paymentIntent)
    }

    console.log('this is payment method', paymentMethod)
  }

  const reset = () => {
    setError(null)
    setProcessing(false)
    setPaymentMethod(null)
    setBillingDetails({ email: '', name: '' })
  }

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for you donation!  It is greatly appreciated. This donation was done with Stripe Elements demo.
        Dont worry no money was actually charged, but we generated a PaymentMethod: {paymentMethod.id} for the amount of
        ${(paymentMethod.amount / 100).toFixed(2)}
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value })
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value })
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error)
            setCardComplete(e.complete)
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay ${props.cart.priceTotal.toFixed(2)}
      </SubmitButton>
    </form>
  )
}

// const TestCheckout = props => {
//   return (
//     <div className="AppWrapper">
//       <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
//         <CheckoutForm cart={props.cart} />
//       </Elements>
//     </div>
//   )
// }

export default CheckoutForm
