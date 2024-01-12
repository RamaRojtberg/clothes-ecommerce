import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import slide1 from "../assets/slide/slide1.jpg"
import slide2 from "../assets/slide/slide2.jpg"
import slide3 from "../assets/slide/slide3.jpg"
import slide4 from "../assets/slide/slide4.jpg"

const MainCarousel = () => {
  return (
    <div style={{width:"100%", margin:"0 auto"}}>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
            <img src={slide1} alt='img' />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img src={slide2} alt='img' />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src={slide3} alt='img' />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img src={slide4} alt='img' />
            <p className="legend">Legend 3</p>
        </div>
    </Carousel>
    </div>
  )
}

export default MainCarousel
