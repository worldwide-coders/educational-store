import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ItemsCards from '../ItemsCards/ItemsCards'
import './Items.css'
import Layout from '../shared/Layout/Layout'

// import the api's url
import apiUrl from '../../apiConfig'

// Import axios so we can make HTTP requests
import axios from 'axios'

// This will be our Items Index component (show all items)
class Items extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      // we have zero items, until our API request has finished
      items: []
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    // make a GET request for all of the items
    axios({
      url: `${apiUrl}/items`
      // headers: {
      //   'Authorization': `Token token=${this.props.user.token}`
      // }
    })
      .then(res => this.setState({ items: res.data.items }))
      .catch(console.error)
  }

  render () {
    const items = this.state.items.map(item => (
      <Link key={item._id} to={`/items/${item._id}`}>
        <ItemsCards card={item} />
      </Link>
    ))

    return (
      <Layout>
        <div>
          <h4>Items</h4>
          <div className='container col-sm-12'>
            {items}
          </div>
        </div>
      </Layout>
    )
  }
}

export default Items
