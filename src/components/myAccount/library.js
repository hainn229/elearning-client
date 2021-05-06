/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import queryString from "query-string";

import { PlusOutlined, HeartOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  List,
  Card,
  Button,
  Tabs,
  message,
  Image,
} from "antd";
const { TabPane } = Tabs;

const { Meta } = Card;

const LibraryComponent = () => {
  useAuth();
  const jwt = localStorage.getItem("token");
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const userId = user._id;

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 5,
  });
  const [library, setLibrary] = useState();
  const getLibrary = async (userId) => {
    try {
      if (userId) {
        const keys = queryString.stringify(pagination);
        const result = await axios.get(
          `http://localhost:4000/orders/library/${userId}?${keys}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (result.status === 200) {
          setLibrary(result.data.library);
        }
      }
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.message);
      } else {
        return message.error(error.message);
      }
    }
  };

  const [wishlist, setWishlist] = useState();
  const getWishlist = async (userId) => {
    try {
      if (userId) {
        const result = await axios.get(
          `http://localhost:4000/wishlists/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        setWishlist(result.data.wishlists);
      }
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.message);
      } else {
        return message.error(error.message);
      }
    }
  };

  const [actionsStatus, setActionsStatus] = useState(false);
  const onAddToCart = async (courseId) => {
    if (user) {
      try {
        const result = await axios.post(
          `http://localhost:4000/orders/add`,
          {
            user_id: user._id,
            course_id: courseId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (result.status === 200) {
          setActionsStatus(!actionsStatus);
          message.success(result.data.message);
          setTimeout(() => {
            return window.history.go();
          }, 1500);
        }
      } catch (error) {
        if (error.response) {
          return message.error(error.response.data.message);
        } else {
          return message.error(error.message);
        }
      }
    }
  };
  const onRemove = async (id) => {
    const result = await axios.delete(`http://localhost:4000/wishlists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    if (result.status === 200) {
      setActionsStatus(!actionsStatus);
      return message.success(result.data.message);
    }
  };

  useEffect(() => {
    getLibrary(userId);
    getWishlist(userId);
  }, [userId, actionsStatus]);

  return (
    <>
      <br />
      <br />
      <br />
      <div className="container-content">
        <Row>
          <Col flex={4}>
            <Breadcrumb style={{ margin: "16px 0", fontSize: "16px" }}>
              <Breadcrumb.Item>
                <Link to={`/`}>Home</Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link to={`/user/dashboard`}>{user.full_name}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>My Library</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <Tabs style={{ height: "100%", marginBottom: 40 }}>
            <TabPane tab={<h6>All Courses</h6>} key="2">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 5,
                  xxl: 5,
                }}
                dataSource={library}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "2px solid whitesmoke",
                      }}
                      cover={
                        <Image
                          preview={false}
                          height={300}
                          alt="poster"
                          src={item.course_id.poster}
                        />
                      }
                    >
                      <Meta
                        title={
                          <>
                            <Link to={`/course/learn/${item.course_id._id}`}>
                              {item.course_id.course_title}
                            </Link>
                          </>
                        }
                        description={
                          <>
                            <p>
                              {item.course_id.tutor_id
                                ? item.course_id.tutor_id.full_name
                                : item.course_id.tutor}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                              }}
                            >
                              {item.course_id.cat_id.cat_name}
                            </p>
                          </>
                        }
                      />
                      <br />
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab={<h6>Wishlist</h6>} key="3">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 5,
                  xxl: 5,
                }}
                dataSource={wishlist}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "2px solid whitesmoke",
                      }}
                      cover={<img alt="poster" src={item.course_id.poster} />}
                    >
                      <Meta
                        title={
                          <>
                            <Link to={`/courses/${item.course_id._id}`}>
                              {item.course_id.course_title}
                            </Link>
                          </>
                        }
                        description={
                          <>
                            <p>
                              {item.course_id.tutor_id
                                ? item.course_id.tutor_id.full_name
                                : item.course_id.tutor}
                            </p>
                            <p
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {item.course_id.cat_id.cat_name}
                            </p>
                            <h6>Price: ${item.course_id.price}</h6>
                          </>
                        }
                      />
                      <br />
                      <List
                        grid={{
                          gutter: 16,
                          xs: 1,
                          sm: 2,
                          md: 4,
                          lg: 4,
                          xl: 6,
                          xxl: 3,
                        }}
                      >
                        <List.Item>
                          <Button
                            onClick={() => onAddToCart(item.course_id._id)}
                            style={{ width: "100%" }}
                            icon={<PlusOutlined />}
                            type="primary"
                          >
                            Add to Cart
                          </Button>
                        </List.Item>
                        <List.Item>
                          <Button
                            onClick={() => onRemove(item._id)}
                            style={{ width: "100%" }}
                            icon={<HeartOutlined />}
                            type="primary"
                            danger
                          >
                            Remove
                          </Button>
                        </List.Item>
                      </List>
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default LibraryComponent;
