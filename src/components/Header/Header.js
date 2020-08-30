import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './Header.css'

const authenticatedOptions = (cart) => (
  <Fragment>
    <NavDropdown title="Options" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href={`#carts/${cart}`}>My Cart</Nav.Link>
    <Nav.Link href="#carts">All Orders</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavDropdown title="Login" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#sign-up">Sign Up</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-in">Sign In</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#items">Items for Sale</Nav.Link>
    <Nav.Link href="#items/:id">Find an item</Nav.Link>
  </Fragment>
)

const Header = ({ user, cart }) => (
  <Navbar style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(66,66,128,1) 50%, rgba(46,109,166,1) 83%, rgba(0,212,255,1) 100%)' }} className={ user ? '' : styles.navbarBackground} variant="dark" expand="md">
    <Navbar.Brand href="#">An Educational Supply Donation Store
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions(cart) : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
