import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <div className="carouselComponent">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px"}}
            className="d-block w-100"
            src="https://images.wallpaperscraft.com/image/books_mug_glasses_191440_3840x2160.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <h5>Nulla vitae elit libero, a pharetra augue mollis interdum.</h5> */}
            <button href="/courses/" className="btn btn-primary">Start Learning Now!</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px"}}
            className="d-block w-100"
            src="https://images.wallpaperscraft.com/image/learning_books_laptop_186076_3840x2160.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5> */}
            <button href="/courses/" className="btn btn-primary">Start Learning Now!</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px"}}
            className="d-block w-100"
            src="https://images.wallpaperscraft.com/image/books_table_lamp_113765_3840x2160.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <h5>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </h5> */}
            <button href="/courses/" className="btn btn-primary">Start Learning Now!</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
