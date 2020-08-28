import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Checkout from './Checkout/Checkout'

import Cart from './Cart/Cart'

//  ***** IT LOOKS LIKE THIS MODAL INCLUDES A FORM WHERE WE CAN INSERT THE CHECKOUT FORM***
// ****** the checkoutModal must include the /checkout content *******
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

function App () {
  let subtitle
  //   const [modalIsOpen, setIsOpen] = React.useState(false)
  //   function openModal () {
  //     setIsOpen(true)
  //   }

  //   function afterOpenModal () {
  //     // references are now sync'd and can be accessed.
  //     subtitle.style.color = '#f00'
  //   }

  //   function closeModal () {
  //     setIsOpen(false)
  //   }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
        <Checkout />
      </Modal>
    </div>
  )
}

ReactDOM.render(<App />)
