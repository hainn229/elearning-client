import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
const { Footer } = Layout;
const FooterComponent = () => {
  return (
    <Footer>
      <Row justify="center" align="top">
        <Col>
          <h1>Elearning</h1>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col>
          <p>Quan Hoa Ward, Cau Giay District</p>
          <p>Ha Noi City, Viet Nam</p>
          <p>Phone: (+84) 329 75 8634</p>
          <p>Email: hainn229@gmail.com</p>
        </Col>
        <Col style={{ textAlign: "right", marginLeft:20 }}>
          <p>
            <Link>Contact</Link>
          </p>
          <p>
            <Link>Support</Link>
          </p>
          <p>
            <Link>About Us</Link>
          </p>
          <p>
            <Link>Follow Us in Facebook</Link>
          </p>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col>
          © 2021 Elearning Edu. All Rights Reserved.
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
