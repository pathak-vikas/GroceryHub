import React from 'react'
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import tgs from './media/tgs.gif'
import pantry from './media/pantry.jpg'
import fff from './media/fff.jpg'

// import SlidingGalleryImage3 from './SildingGalleryImages/gallery_3.jpg'

const items = [
    {
        src: fff,  
        // caption: 'North Texas\' number one organic vegetable producer'
    },
    {
        src: pantry,  
        // caption: 'North Texas\' number one organic vegetable producer'
    },
    {
        src: tgs,  
        // caption: 'North Texas\' number one organic vegetable producer'
    }
];

const Banner = () => {
    const carouselImages = items.map((item) => {
        return (
            <Carousel.Item>
                <div style={{width : "100%", height : "19rem"}}>
            <img
              className="d-block w-100"
              src={item.src}
              alt="First slide"
            />
            </div>
            {/* <Carousel.Caption>
              <p>{item.caption}</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        );
    });
    return (
        // <Carousel>
        //     {carouselImages}
        // </Carousel>
        
        <Carousel>
  <Carousel.Item>
  <div style={{width : "100%", height : "19rem"}}>
    <img
      className="d-block w-100"
      src={tgs}
      alt="First slide"
    /></div>
    {/* <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
  <div style={{width : "100%", height : "19rem"}}>
    <img
      className="d-block w-100"
      src={pantry}
      alt="Second slide"
    /></div>

    {/* <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
  <div style={{width : "100%", height : "19rem"}}>
    <img
      className="d-block w-100"
      src={fff}
      alt="Third slide"
    /></div>

    {/* <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
</Carousel>
      );
}

export default Banner;