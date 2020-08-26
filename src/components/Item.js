import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'

// import the api's url
import apiUrl from '../../apiConfig'

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
  // runs when the component appears (is created and inserted into DOM)
  componentDidMount () {
    // make a request to get the book, with the current routes'id
    axios(`${apiUrl}/items/${this.props.match.params.id}`)
      // set the `book` state to the `book` data we got back from the response (res.data.book)
      .then(res => this.setState({ item: res.data.item }))
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

  const addToCart= () => {
    axios({
        url: `${apiUrl}/carts/${this.props.match.params.id}`,
        method: 'PATCH'
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
      <Layout>
        <h4>{item.name}</h4>
        <p>Price: {item.price}</p>
        
        <Link to='/items'>Back to all items</Link>
      </Layout>
    )
  }
}

export default Item
