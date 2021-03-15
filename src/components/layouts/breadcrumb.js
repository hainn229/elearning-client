import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import {
  Breadcrumb,
  Row,
  Col,
  Input,
  Tabs,
  List,
  Card,
  Button,
  Divider,
  Avatar,
  Space,
} from "antd";
import {
  PlusOutlined,
  HeartOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
const { Search } = Input;
const { Meta } = Card;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const BreadCrumbComponent = () => {
  const [search, setSearch] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    limitPage: 5,
    keywords: "",
  });

  const searchCourses = async () => {
    try {
      const paramsKey = queryString.stringify(pagination);
      const result = await axios.get(
        `https://api--elearning.herokuapp.com/courses?${paramsKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        setSearch(result.data.courses.docs);
      }
    } catch (err) {
      return Alert.error(
        `<div role="alert">${err.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    }
  };
  useEffect(() => {
    searchCourses();
  }, [pagination]);
  const searchData = useSelector((state) => {
    return state.coursesReducer.data;
  });
  return (
    <>
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
            value={pagination.keywords}
            onChange={(event) => {
              setSearchResultsVisible(true);
              setPagination({ ...pagination, keywords: event.target.value });
            }}
          />
        </Col>
      </Row>
      <Row className={searchResultsVisible == false ? "searchResults" : ""}>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <div className="site-card-wrapper">
            <Divider orientation="left">
              <h4>Search Results</h4>
            </Divider>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={searchData}
              renderItem={(item) => (
                <List.Item
                  key={item.course_title}
                >
                  <List.Item.Meta
                    title={<a href="">{item.course_title}</a>}
                    description={
                      <>
                        <h6>Price: ${item.price}</h6>
                        <p>Level: {item.level}</p>
                        {/* <p>Tutor: {item.tutor_id.full_name}</p>
                        <p>Topics: {item.cat_id.cat_name}</p> */}
                        {item.description}
                        <br />
                        <IconText
                          icon={StarOutlined}
                          text="156"
                          key="list-vertical-star-o"
                          
                        />
                        <span style={{ marginRight: "10px", marginLeft: "10px" }}></span>
                        <IconText
                          icon={MessageOutlined}
                          text="2"
                          key="list-vertical-message"
                        />
                      </>
                    }
                  />
                  {item.content}
                  <Button style={{ marginRight: "10px" }} icon={<PlusOutlined />}>Add to Cart</Button>
                  <Button
                    shape="circle"
                    icon={<HeartOutlined />}
                    danger
                  />
                </List.Item>
              )}
            />
            {/* <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={searchData}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    style={{
                      width: "100%",
                      height: "auto",
                      border: "2px solid whitesmoke",
                    }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >
                    <Meta
                      title={<a href="">{item.course_title}</a>}
                      description={<h6>Price: ${item.price}</h6>}
                    />
                    <br />
                    <Button icon={<PlusOutlined />}>Add to Cart</Button>
                    <Button
                      style={{ float: "right" }}
                      shape="circle"
                      icon={<HeartOutlined />}
                      danger
                    />
                  </Card>
                </List.Item>
              )}
            /> */}
          </div>
        </div>
      </Row>
      <br />
    </>
  );
};

export default BreadCrumbComponent;
