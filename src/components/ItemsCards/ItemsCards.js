import { Card } from 'react-router-card'
// <Button variant="primary">Go somewhere</Button>




const ItemsCards = () => {
  const cardInfo = [
    { image: '', title: '', text: ''},
    { image: '', title: '', text: ''},
    { image: '', title: '', text: ''}
  ]
}

const renderCard = (card, index) => {
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Name>Card Title</Card.Name>
      <Card.Price>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Price>

      </Card.Body>
      </Card>
  )
}

return (

)

export default ItemsCards
