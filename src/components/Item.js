import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
// import Layout from './shared/Layout/Layout'
import CartButton from './shared/Buttons/CartButton'

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
    console.log(this.props)
    axios({
      url: apiUrl + `/items/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })

    // set the `book` state to the `book` data we got back from the response (res.data.book)

      .then(res => {
        console.log('WE MADE IT HERE')
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

   addToCart = () => {
     axios({
       url: `${apiUrl}/carts/${this.props.cartId}`,
       headers: {
         'Authorization': `Token token= ${this.props.user.token}`
       },
       method: 'POST'
       // data:
     })
     // update their `deleted` state to be `true`
       .then(() => this.setState({ addedToCart: true }))
       .catch(console.error)
     // return If cart button is clicked, this.setState({ addedToCart: true })
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
         <CartButton addToCart={this.addToCart} />
         <Link to='/items'>Back to all items</Link>
       </div>
     )
   }
}

export default withRouter(Item)
