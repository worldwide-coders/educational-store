import React from 'react'
import Card from 'react-bootstrap/Card'
import Item from '../Item'
import styles from './Box.css'
// <Button variant="primary">Go somewhere</Button>

const ItemsCards = ({ card }) => {
  return (
    <div className='row'>
      <div className='col-sm-8'>
        <div className={styles.cardStyle}>
          <Card style={{ width: '18rem' }} key={Item._id}>
            <Card.Img variant="top" src={card.imageUrl} />
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <Card.Text>
                {card.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default ItemsCards

// const cardInfo = [
//   { image: '', title: '', text: '' },
//   { image: '', title: '', text: '' },
//   { image: '', title: '', text: '' }
// ]
