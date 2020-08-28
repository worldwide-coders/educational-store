import React from 'react'
import Card from 'react-bootstrap/Card'
// <Button variant="primary">Go somewhere</Button>

const ItemsCards = ({ card }) => {
  return (
    <React.Fragment className="EducationalStore">
      <Card style={{ width: '18rem' }} key={card._id}>
        <Card.Img variant="top" src={card.imageUrl} />
        <Card.Body>
          <Card.Title>{card.name}</Card.Title>
          <Card.Text>
            {card.price}
          </Card.Text>

        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default ItemsCards

// const cardInfo = [
//   { image: '', title: '', text: '' },
//   { image: '', title: '', text: '' },
//   { image: '', title: '', text: '' }
// ]
