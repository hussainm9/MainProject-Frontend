// ControlledCarousel.js

import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './carouse.css'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className='carousel-container' activeIndex={index} onSelect={handleSelect} style={{ width: '100%' }}>
      <Carousel.Item>
        <img
          src='https://image.lexica.art/full_webp/01ec9b22-fae2-465b-8829-4fae150f37bb'
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='https://image.lexica.art/full_webp/2e9c5804-7a7e-48db-8d12-749bf0eeb43f'
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='https://image.lexica.art/full_webp/e3cdb2c6-71b9-49c8-8ca5-ab69d9e1865b'
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
