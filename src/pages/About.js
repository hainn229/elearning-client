import React from "react";
import { PageHeader } from "antd";

export const About = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <div className="container-content">
        <div className="pageExtend">
          <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title="About Us"
            subTitle=""
            style={{ textAlign: "center" }}
          >
            <h1>E-learning</h1>
            <p>Design by</p>
            <h2>Nguyen Ngoc Hai</h2>
            <p>Country</p>
            <h5>Viet Nam</h5>
            <p>Version</p>
            <h2>1.0.0</h2>
            {/* <p>Phone Number</p>
            <h5>(+84) 329 75 8634 or (+84) 843 31 36 34</h5>
            
            <p>Email</p>
            <h5>hainn229.dev@gmail.com</h5>
            <p>Address</p>
            <h5>
              No. 11, 58/54 Alley, Nguyen Khanh Toan Road, Quan Hoa Ward, Cau
              Giay District, Ha Noi City, Viet Nam
            </h5> */}
          </PageHeader>
        </div>
      </div>
    </>
  );
};
