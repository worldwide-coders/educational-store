import React from './node_modules/react'
import Footer from './Footer'

const Layout = props => (
  <div>
    <h1>An Educational Supply Donation Store</h1>

    {/* props.children, is the content between the opening and closing tag of
    the layout element you're using */}
    {props.children}

    <Footer />
  </div>
)

export default Layout
