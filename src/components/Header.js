import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


const Header = () => {
    return (
        <div>
            <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={'./carousel1.jpeg'}
                alt="First slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={'./carousel2.jpeg'}
                alt="Third slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={'./carousel3.jpg'}
                alt="Third slide"
                />
            </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Header;

