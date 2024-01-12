import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

import product1 from "../assets/products/product1.jpeg"
import product2 from "../assets/products/product2.jpeg"
import product3 from "../assets/products/product3.jpeg"
import product4 from "../assets/products/product4.jpeg"
import product5 from "../assets/products/product5.jpeg"
/*import product6 from "../assets/products/product6.jpeg"
import product7 from "../assets/products/product7.jpeg"
import product8 from "../assets/products/product8.jpeg"*/


export default function App() {
  return (
    <>
      <Swiper
        direction='vertical'
        mousewheel={true}
        slidesPerView={'auto'}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Mousewheel]}
        className="mySwiper"
        style={{width:"12%", marginLeft:"15px"}}
      >
        <SwiperSlide style={{flexShrink:"1"}}>
            <img src={product1} alt='imgSlide' style={{width:"100%", borderRadius:"3px"}} />
        </SwiperSlide>
        <SwiperSlide style={{flexShrink:"1"}}>
            <img src={product2} alt='imgSlide' style={{width:"100%", borderRadius:"3px"}} />
        </SwiperSlide>
        <SwiperSlide style={{flexShrink:"1"}}>
            <img src={product3} alt='imgSlide' style={{width:"100%", borderRadius:"3px"}} />
        </SwiperSlide>
        <SwiperSlide style={{flexShrink:"1"}}>
            <img src={product4} alt='imgSlide' style={{width:"100%", borderRadius:"3px"}} />
        </SwiperSlide>
        <SwiperSlide style={{flexShrink:"1"}}>
            <img src={product5} alt='imgSlide' style={{width:"100%", borderRadius:"3px"}} />
        </SwiperSlide>

      </Swiper>
    </>
  );
}
