import React from "react";
import { Carousel } from "react-bootstrap";
import { Button } from "antd";
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  return (
    <div className="carouselComponent">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px" }}
            src="https://upm.com.vn/uploads/files/MR-3017-industry-elearning-1%20copy.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <h5>Nulla vitae elit libero, a pharetra augue mollis interdum.</h5> */}
            <Button type="primary">
              <Link to={`/courses/`}>Start Learning Now!</Link>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px" }}
            src="https://www.softwaresuggest.com/blog/wp-content/uploads/2019/10/e-learning-marketing-FB.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5> */}
            <Button type="primary">
              <Link to={`/courses/`}>Start Learning Now!</Link>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px" }}
            src="https://websitehoctructuyen.com/wp-content/uploads/2020/08/e-learning-la-gi.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <h5>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </h5> */}
            <Button type="primary">
              <Link to={`/courses/`}>Start Learning Now!</Link>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{ width: "100%", height: "700px" }}
            src="https://appinventiv.com/wp-content/uploads/sites/1/2018/12/mLearning-Stats.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <h5>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </h5> */}
            <Button type="primary">
              <Link to={`/courses/`}>Start Learning Now!</Link>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
