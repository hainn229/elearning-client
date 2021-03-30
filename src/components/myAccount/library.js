import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

import {
  PlusOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  List,
  Card,
  Button,
  Tabs,
} from "antd";
const { TabPane } = Tabs;

const { Meta } = Card;

const LibraryComponent = () => {
  useAuth();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const userId = user._id;

  //   const [register, handleSubmit] = useForm();
  //   const onSubmit = async (updateInfo) => {
  //       const result = await axios.put(

  //       )
  //   }

  const [wishlist, setWishlist] = useState();
  const getWishlist = async (userId) => {
    if (userId) {
      const result = await axios.get(
        // `https://api--elearning.herokuapp.com/wishlists/${userId}`,
        `http://localhost:4000/wishlists/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setWishlist(result.data.wishlists);
    }
  };

  useEffect(() => {
    getWishlist(userId);
  }, [userId]);

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
                  column: 3,
                }}
                pagination={{
                  pageSize: 3,
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
                            <Link to={`/course/learn/${item.course_id._id}`}>
                              {item.course_id.course_title}
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
                              Price: ${item.course_id.price}
                              {"  "}
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
                  column: 3,
                }}
                pagination={{
                  pageSize: 3,
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
                            <Link to={`/courses/${item.course_id._id}`}>
                              {item.course_id.course_title}
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
                              Price: ${item.course_id.price}
                              {"  "}
                            </p>
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
                            style={{ width: "100%" }}
                            icon={<PlusOutlined />}
                            type="primary"
                          >
                            Add to Cart
                          </Button>
                        </List.Item>
                        <List.Item>
                          <Button
                            style={{ width: "100%" }}
                            onClick={() => {
                              console.log(1);
                            }}
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
