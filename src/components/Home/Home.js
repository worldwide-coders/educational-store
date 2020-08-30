import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import styles from './Home.css'
import Layout from '../shared/Layout/Layout'
// import homeStyles from './Home/Home.css'
import artSupplies from './homeImages/artSupplies.jpg'
import crayons from './homeImages/crayons.jpg'
import pencilShavings from './homeImages/pencilShavings.jpg'

// image source isn't recognizing path to image in file
// commented out below is a previous (incorrect) carousel skeleton that
// contains live links of the images

// wanted to wrap carousel in bootstrap container and row with a new row underneath to enter content

function HomeCarousel () {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Layout>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={artSupplies}
            alt="First slide"
          />
          <Carousel.Caption>
            <div className={styles.carouselTextDiv}>
              <h3>Donate crafts to your local schools</h3>
              <p>Schools in your neighborhood may need extra art supplies.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={crayons}
            alt="Second slide"
          />

          <Carousel.Caption>
            <div className={styles.carouselTextDiv}>
              <h3>Donate writing utensils</h3>
              <p>Your local schools can request supplies crucial to the learning environment.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pencilShavings}
            alt="Third slide"
          />

          <Carousel.Caption>
            <div className={styles.carouselTextDiv}>
              <h3>Donate as much or as little as you can</h3>
              <p>
                Your gifts will forever impact your community.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Layout>
  )
}

export default HomeCarousel
