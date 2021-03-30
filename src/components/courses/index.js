/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import {
  PlusOutlined,
  HeartOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Input,
  Tabs,
  List,
  Card,
  Button,
  Space,
  Divider,
} from "antd";

const { Meta } = Card;
const { TabPane } = Tabs;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const { Search } = Input;

const CoursesComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 10,
  });

  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResultsData, setSearchResultsData] = useState();
  const [filter, setFilter] = useState({
    keywords: "",
    tutorId: "",
    category: "",
  });
  const [resultsFilter, setResultsFilter] = useState();

  const search = async () => {
    const keys = queryString.stringify(filter);
    const result = await axios.get(
      // `https://api--elearning.herokuapp.com/courses?${keys}`,
      `http://localhost:4000/courses?${keys}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setResultsFilter(result.data.courses.docs);
    setSearchResultsData(result.data.courses.docs);
  };

  useEffect(() => {
    search();
  }, [filter]);

  const getCategories = async () => {
    const result = await axios.get(
      // `https://api--elearning.herokuapp.com/categories/all`,
      `http://localhost:4000/categories/all`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "CATEGORIES", payload: result.data.categories });
  };

  const getCourses = async () => {
    const keys = queryString.stringify(pagination);
    const result = await axios.get(
      // `https://api--elearning.herokuapp.com/courses?${keys}`,
      `http://localhost:4000/courses?${keys}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "COURSES", payload: result.data.courses.docs });
  };

  const [wishlist, setWishlist] = useState();
  const actionWishlist = async () => {
      if (user._id) {
        const result = await axios.get(
          // `https://api--elearning.herokuapp.com/wishlists/${userId}`,
          `http://localhost:4000/wishlists/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setWishlist(result.data.wishlists);
      }
  }

  useEffect(() => {
    getCategories();
    getCourses();
  }, [pagination]);

  const courses = useSelector((state) => {
    return state.coursesReducer.data;
  });
  const categories = useSelector((state) => {
    return state.categoriesReducer.data;
  });

  return (
    <>
      <Row>
        <Col flex={4}>
          <Breadcrumb style={{ margin: "16px 0", fontSize: "16px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Courses</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col flex={1}>
          <Search
            style={{ margin: "8px 0", fontSize: "16px" }}
            placeholder="Search course..."
            allowClear
            enterButton="Search"
            size="large"
            value={filter.keywords}
            onChange={(event) => {
              setSearchResultsVisible(true);
              setFilter({ ...filter, keywords: event.target.value });
            }}
          />
        </Col>
      </Row>
      <Row className={searchResultsVisible === false ? "searchResults" : ""}>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <Divider orientation="left">
            <h4>Search Results</h4>
          </Divider>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 3,
            }}
            dataSource={searchResultsData}
            renderItem={(item) => (
              <List.Item key={item.course_title}>
                <List.Item.Meta
                  title={
                    <Link to={`/courses/${item._id}`}>{item.course_title}</Link>
                  }
                  description={
                    <>
                      <h6>Price: ${item.price}</h6>
                      <p>Level: {item.level}</p>
                      <p>Tutor: {item.tutor_id.full_name}</p>
                      <p>Topics: {item.cat_id.cat_name}</p>
                      {item.description}
                      <br />
                      <IconText
                        icon={StarOutlined}
                        text="156"
                        key="list-vertical-star-o"
                      />
                      <span
                        style={{ marginRight: "10px", marginLeft: "10px" }}
                      ></span>
                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />
                    </>
                  }
                />
                {item.content}
                <Button style={{ marginRight: "10px" }} icon={<PlusOutlined />}>
                  Add to Cart
                </Button>
                <Button
                  shape="circle"
                  icon={<HeartOutlined />}
                  danger
                  onClick={async () => {
                    if (!user._id) {
                      return Alert.error(
                        `<div role="alert">You need to be signed in to use this feature!</div>`,
                        {
                          html: true,
                          position: "top-right",
                          effect: "bouncyflip",
                        }
                      );
                    } else {
                      let course_id = item._id;
                      await axios.post(
                        // `https://api--elearning.herokuapp.com/wishlists/add`,
                        `http://localhost:4000/wishlists/add`,
                        {
                          course_id: course_id,
                          user_id: user._id,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      setWishlistStatus(!wishlistStatus);
                    }
                  }}
                />
              </List.Item>
            )}
          />
        </div>
      </Row>
      <br />
      <div className="site-layout-content">
        <Tabs
          tabPosition="left"
          defaultActiveKey="All Courses"
          onChange={(key) => {
            if (key !== "All Courses") {
              setFilter({ ...filter, category: [key] });
            }
          }}
        >
          <TabPane tab="All Courses" key="All Courses">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={courses}
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
                      title={
                        <>
                          <Link to={`/courses/${item._id}`}>
                            {item.course_title}
                          </Link>
                        </>
                      }
                      description={
                        <>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            Price: ${item.price}
                            {"  "}
                          </p>
                          <p>
                            Tutor:{" "}
                            <a href={`/users/${item.tutor_id._id}`}>
                              {item.tutor_id.full_name}
                            </a>
                          </p>
                          {/* <p>
                              <IconText
                                icon={StarOutlined}
                                text={item.num_of_subscribers}
                                key="list-vertical-star-o"
                              />
                              <span> | </span>
                              <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                              />
                            </p> */}
                        </>
                      }
                    />
                    <br />
                    <Button type="primary" icon={<PlusOutlined />}>
                      Add to Cart
                    </Button>
                    <Button
                      onClick={async () => {
                        if (!user._id) {
                          return Alert.error(
                            `<div role="alert">You need to be signed in to use this feature!</div>`,
                            {
                              html: true,
                              position: "top-right",
                              effect: "bouncyflip",
                            }
                          );
                        } else {
                          let course_id = item._id;
                          await axios.post(
                            // `https://api--elearning.herokuapp.com/wishlists/add`,
                            `http://localhost:4000/wishlists/add`,
                            {
                              course_id: course_id,
                              user_id: user._id,
                            },
                            {
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );
                          setWishlistStatus(!wishlistStatus);
                        }
                      }}
                      style={{ float: "right" }}
                      shape="circle"
                      icon={<HeartOutlined />}
                      danger
                    />
                  </Card>
                </List.Item>
              )}
            />
            {pagination.limitPage <= courses.length ? (
              <Button
                onClick={() => {
                  setPagination({
                    ...pagination,
                    limitPage: pagination.limitPage + 10,
                  });
                }}
              >
                More...
              </Button>
            ) : (
              ""
            )}
          </TabPane>
          {[...Array.from(categories)].map((i) => (
            <TabPane tab={i.cat_name} key={i._id}>
              <List
                grid={{
                  gutter: 16,
                  column: 4,
                }}
                dataSource={resultsFilter}
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
                        title={
                          <Link to={`/courses/${item._id}`}>
                            {item.course_title}
                          </Link>
                        }
                        description={
                          <>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                              }}
                            >
                              Price: ${item.price}
                            </p>
                            <p>
                              Tutor:{" "}
                              <Link to={`/tutor/${item.tutor_id._id}`}>
                                {item.tutor_id.full_name}
                              </Link>
                            </p>
                            {/* <p>
                                  <IconText
                                    icon={StarOutlined}
                                    text={item.num_of_subscribers}
                                    key="list-vertical-star-o"
                                  />
                                  <span> | </span>
                                  <IconText
                                    icon={MessageOutlined}
                                    text="2"
                                    key="list-vertical-message"
                                  />
                                </p> */}
                          </>
                        }
                      />
                      <br />
                      <Button type="primary" icon={<PlusOutlined />}>
                        Add to Cart
                      </Button>
                      <Button
                        onClick={async () => {
                          if (!user._id) {
                            return Alert.error(
                              `<div role="alert">You need to be signed in to use this feature!</div>`,
                              {
                                html: true,
                                position: "top-right",
                                effect: "bouncyflip",
                              }
                            );
                          } else {
                            let course_id = item._id;
                            await axios.post(
                              // `https://api--elearning.herokuapp.com/wishlists/add`,
                              `http://localhost:4000/wishlists/add`,
                              {
                                course_id: course_id,
                                user_id: user._id,
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                },
                              }
                            );
                            setWishlistStatus(!wishlistStatus);
                          }
                        }}
                        style={{ float: "right" }}
                        shape="circle"
                        icon={<HeartOutlined />}
                        // type={
                        //   item.wishlist.some(
                        //     (user_id) => user_id._id === user._id
                        //   )
                        //     ? "primary"
                        //     : ""
                        // }
                        danger
                      />
                    </Card>
                  </List.Item>
                )}
              />
              {/* {resultsFilter.length > 10 ? (
                <Button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      limitPage: pagination.limitPage + 10,
                    })
                  }
                >
                  More...
                </Button>
              ) : (
                ""
              )} */}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};
export default CoursesComponent;
