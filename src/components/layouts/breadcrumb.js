import React from "react";
import { Breadcrumb, Row, Col, Input } from "antd";
const { Search } = Input;

const BreadCrumbComponent = () => {
  const onSearch = (value) => console.log(value);
  return (
    <Row>
      <Col flex={4}>
        <Breadcrumb style={{ margin: "16px 0", fontSize: "16px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Categories</Breadcrumb.Item>
          <Breadcrumb.Item>Business</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col flex={1}>
        <Search
          style={{ margin: "8px 0", fontSize: "16px" }}
          placeholder="Enter course title . . ."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Col>
    </Row>
  );
};

export default BreadCrumbComponent;
