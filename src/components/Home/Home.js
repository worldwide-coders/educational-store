import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import styles from './Home.css'
// import homeStyles from './Home/Home.css'

// image source isn't recognizing path to image in file
// commented out below is a previous (incorrect) carousel skeleton that
// contains live links of the images

function HomeCarousel () {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + './homeImages/artSupplies.jpg'}
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
          src={process.env.PUBLIC_URL + './homeImages/crayons.jpg'}
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
          src={process.env.PUBLIC_URL + './homeImages/pencilShavings.jpg'}
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
  )
}

export default HomeCarousel

// const Home = () => {
//   return (
//     <div>
//       <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//         <ol className="carousel-indicators">
//           <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//           <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//           <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//         </ol>
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img className="d-block w-100" src="https://imgur.com/VivQUlP" alt="First slide"/>
//           </div>
//           <div className="carousel-item">
//             <img className="d-block w-100" src="https://imgur.com/4eL2QN3" alt="Second slide"/>
//           </div>
//           <div className="carousel-item">
//             <img className="d-block w-100" src="https://imgur.com/wTcNpSx" alt="Third slide"/>
//           </div>
//         </div>
//         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="sr-only">Previous</span>
//         </a>
//         <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="sr-only">Next</span>
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Home
