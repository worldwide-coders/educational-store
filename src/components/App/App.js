import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import HomeCarousel from '../Home/Home'
import SignUp from '../auth/SignUp/SignUp'
import SignIn from '../auth/SignIn/SignIn'
import SignOut from '../auth/SignOut/SignOut'
import ChangePassword from '../auth/ChangePassword/ChangePassword'
import Item from '../Item'
import Items from '../Items/Items'
import Orders from '../Orders/Orders'

import Cart from '../Cart/Cart'
// import Checkout from '../Checkout/Checkout'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      cart: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  setCart = cart => this.setState({ cart })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user, cart } = this.state

    return (
      <Fragment>
        <Header user={user} cart={cart} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} setCart={this.setCart} />
          )} />
          <Route exact path='/' render={() => (
            <HomeCarousel />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} setCart={this.setCart} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id' render={() => (
            <Item user={user} msgAlert={this.msgAlert} cart={cart} setCart={this.setCart} />
          )} />
          <Route exact path='/items' render={() => (
            <Items user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/carts' render={() => (
            <Orders user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/carts/:id' render={() => (
            <Cart user={user} cart={cart} setCart={this.setCart}/>
          )} />
          {/*  }<AuthenticatedRoute path='/checkout' render={() => (
            <Checkout user={user} />
          )} /> */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
