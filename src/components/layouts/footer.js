import React from 'react';
import {
    Layout,
    Row,
    Col
} from 'antd';
const {
    Footer
} = Layout;
const FooterComponent = () => {
    return ( 
        <Footer>
            <Row>
                <Col span={12} offset={6} style={{ textAlign: "center" }}>
                <h1>Elearning</h1>
                </Col>
            </Row>
            <Row>
                <Col span={6} offset={6}>
                <p>Quan Hoa Ward, Cau Giay District</p>
                <p>Ha Noi City, Viet Nam</p>
                <p>Phone: (+84) 329 75 8634</p>
                <p>Email: hainn229@gmail.com</p>
                </Col>
                <Col span={6} style={{ textAlign: "right" }}>
                <p><a>Contact</a></p>
                <p><a>Support</a></p>
                <p><a>About Us</a></p>
                <p><a>Follow Us in Facebook</a></p>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6} style={{ textAlign: "center" }}>
                © 2021 Elearning Edu. All Rights Reserved.
                </Col>
            </Row>
        </Footer>
    );
};

export default FooterComponent;