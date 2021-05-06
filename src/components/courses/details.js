/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import queryString from "query-string";
import axios from "axios";

import {
  StarOutlined,
  PlusOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Comment,
  Tooltip,
  List,
  Form,
  Button,
  Row,
  Col,
  Breadcrumb,
  Rate,
  Divider,
  message,
  Image,
} from "antd";

const desc = [1, 2, 3, 4, 5];

const DetailsCourseComponent = (props) => {
  const jwt = localStorage.getItem("token");
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const [comment, setComment] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 5,
  });
  const [totalItems, setTotalItems] = useState();
  const [detailsCourse, setDetailsCourse] = useState({});
  const [category, setCategory] = useState();
  const [tutor, setTutor] = useState();

  const [rate, setRate] = useState({
    value: 1,
  });
  const [rateUpdate, setRateUpdate] = useState({
    value: 1,
  });

  const [status, setStatus] = useState({
    id: null,
    stt: true,
  });
  const courseID = props.courseId;

  const { register, handleSubmit } = useForm();
  const { register: register1, handleSubmit: handleSubmit1 } = useForm();

  const handleChangeRate = (value) => {
    setRate(value);
  };
  const handleChangeRateUpdate = (value) => {
    setRateUpdate(value);
  };

  const getDetailsCourse = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/courses/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );
      if (result.status === 200) {
        setCategory(result.data.course.cat_id.cat_name);
        if (result.data.course.tutor_id) {
          setTutor(result.data.course.tutor_id.full_name);
        } else {
          setTutor(result.data.course.tutor);
        }
        setDetailsCourse(result.data.course);
      }
    } catch (error) {
      return message.error(error.response.data.message);
    }
  };
  const [actionsStatus, setActionsStatus] = useState(false);
  const getComments = async () => {
    const paramsKey = queryString.stringify(pagination);
    const result = await axios.get(
      `http://localhost:4000/comments/${courseID}?${paramsKey}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }
    );
    setComment(result.data.comments);
    setTotalItems(result.data.totalItems);
  };

  const onAddToCart = async (id) => {
    if (user) {
      try {
        const result = await axios.post(
          `http://localhost:4000/orders/add`,
          {
            user_id: user._id,
            course_id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (result.status === 200) {
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
  const onAddToWishlist = async (id) => {
    try {
      if (!user) {
        return message.error(`You need to be signed in to use this feature!`);
      } else {
        const response = await axios.post(
          `http://localhost:4000/wishlists/add`,
          {
            user_id: user._id,
            course_id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        if (response.status === 200) {
          return message.success(response.data.message);
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

  useEffect(() => {
    getDetailsCourse();
  }, [courseID]);

  useEffect(() => {
    getComments();
  }, [actionsStatus, courseID, pagination]);
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
                <Link to={`/`}>Home</Link>{" "}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/`}>All Courses</Link>{" "}
              </Breadcrumb.Item>
              <Breadcrumb.Item>{category}</Breadcrumb.Item>
              <Breadcrumb.Item>{detailsCourse.course_title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <div className="site-card-wrapper">
            <Row>
              <Col flex={2} style={{ width: "30%" }}>
                <Image
                  preview={false}
                  src={detailsCourse.poster}
                  style={{ height: 350, width: 350 }}
                />
              </Col>
              <Col
                flex={3}
                style={{ width: "60%", float: "right", marginLeft: "10px" }}
              >
                <h1>{detailsCourse.course_title}</h1>
                <h3>Topics: {category}</h3>
                <h4>Price: ${detailsCourse.price}</h4>
                <p>Level: {detailsCourse.level}</p>
                <p>Tutor: {tutor}</p>
                {detailsCourse.description}
                <br />
                <br />
                <Button
                  type="primary"
                  style={{ marginRight: "10px" }}
                  icon={<PlusOutlined />}
                  onClick={() => onAddToCart(detailsCourse._id)}
                >
                  Add to Cart
                </Button>
                <Button
                  shape="circle"
                  danger
                  onClick={() => onAddToWishlist(detailsCourse._id)}
                >
                  <HeartOutlined />
                </Button>
              </Col>
            </Row>
            <Divider orientation="left">
              <h3>Comments</h3>
            </Divider>

            <Row>
              <Col flex="200px">
                <Form
                  layout="vertical"
                  initialValues=""
                  requiredMark={true}
                  style={{
                    borderRight: "2px solid whitesmoke",
                    paddingBottom: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <Form.Item>
                    <p>Average rating: </p>
                    <Rate
                      tooltips={desc}
                      onChange={handleChangeRate}
                      value={rate}
                    />
                    {rate ? (
                      <span className="ant-rate-text">{desc[rate - 1]}</span>
                    ) : (
                      ""
                    )}
                    <input
                      style={{ display: "none" }}
                      type="number"
                      name="rate"
                      ref={register}
                      value={rate}
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Description: </p>
                    <textarea
                      style={{ width: "100%" }}
                      rows={4}
                      name="description"
                      ref={register}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      onClick={handleSubmit(async (commentData) => {
                        if (!user._id) {
                          return message.warning(
                            `You need to be signed in to use this feature!`
                          );
                        } else {
                          if (
                            commentData.rate === "" ||
                            commentData.description === ""
                          ) {
                            return message.warning(
                              `You need to fill in the information for a comment!`
                            );
                          }
                          try {
                            const userId = user._id;
                            await axios.post(
                              `http://localhost:4000/comments/add`,
                              {
                                course_id: courseID,
                                user_id: userId,
                                point: commentData.rate,
                                description: commentData.description,
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: "Bearer " + jwt,
                                },
                              }
                            );
                            setActionsStatus(!actionsStatus);
                            return message.success(
                              ` Add comment successfully! `
                            );
                          } catch (error) {
                            return message.error(error.response.data.message);
                          }
                        }
                      })}
                    >
                      Add Comment
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col flex="auto" style={{ marginLeft: 15 }}>
                <List
                  className="comment-list"
                  header={totalItems + " comments"}
                  itemLayout="horizontal"
                  dataSource={comment}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        actions={
                          user && item.user_id
                            ? user._id === item.user_id._id
                              ? [
                                  <span
                                    onClick={() =>
                                      setStatus({
                                        id: item._id,
                                        stt: false,
                                      })
                                    }
                                  >
                                    Edit
                                  </span>,
                                  <span
                                    onClick={async () => {
                                      let commentId = item._id;
                                      await axios.delete(
                                        `http://localhost:4000/comments/${commentId}`,
                                        {
                                          headers: {
                                            "Content-Type": "application/json",
                                            Authorization: "Bearer " + jwt,
                                          },
                                        }
                                      );
                                      setActionsStatus(!actionsStatus);
                                      return message.success(
                                        `Delete comment successfully! `
                                      );
                                    }}
                                  >
                                    Delete
                                  </span>,
                                ]
                              : []
                            : []
                        }
                        author={item.user_id ? item.user_id.full_name : ""}
                        avatar={
                          item.user_id === null ? (
                            <UserOutlined style={{ fontSize: 30 }} />
                          ) : item.user_id.avatarUrl ? (
                            item.user_id.avatarUrl
                          ) : (
                            <UserOutlined style={{ fontSize: 30 }} />
                          )
                        }
                        content={
                          status.id === item._id && status.stt === false ? (
                            <Form
                              layout="vertical"
                              initialValues=""
                              requiredMark={true}
                            >
                              <Form.Item>
                                <p>Average rating: </p>
                                <span>
                                  <Rate
                                    tooltips={desc}
                                    onChange={handleChangeRateUpdate}
                                    initialValues={item.point}
                                    value={rate}
                                    name="point"
                                  />
                                  {rate ? (
                                    <span className="ant-rate-text">
                                      {desc[rate - 1]}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <input
                                    style={{ display: "none" }}
                                    type="number"
                                    name="rate"
                                    ref={register1}
                                    value={rateUpdate}
                                  />
                                </span>
                              </Form.Item>
                              <Form.Item>
                                <p>Description: </p>
                                <textarea
                                  defaultValue={item.description}
                                  style={{ width: "100%" }}
                                  type="text"
                                  rows={2}
                                  name="description"
                                  ref={register1}
                                />
                              </Form.Item>
                              <Form.Item>
                                <Button
                                  type="primary"
                                  onClick={handleSubmit1(async (updateData) => {
                                    try {
                                      if (
                                        updateData.rate === "" ||
                                        updateData.description === ""
                                      ) {
                                        return message.warning(
                                          `You need to fill in the information for a comment!`
                                        );
                                      } else {
                                        let commentId = item._id;
                                        let userId = user._id;
                                        await axios.put(
                                          `http://localhost:4000/comments/${commentId}`,
                                          {
                                            course_id: courseID,
                                            user_id: userId,
                                            point: updateData.rateUpdate,
                                            description: updateData.description,
                                          },
                                          {
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                              Authorization: "Bearer " + jwt,
                                            },
                                          }
                                        );
                                        setActionsStatus(!actionsStatus);
                                        setStatus(true);
                                        return message.success(
                                          ` Update comment successfully! `
                                        );
                                      }
                                    } catch (error) {
                                      if (error.response) {
                                        return message.error(
                                          error.response.data.message
                                        );
                                      } else {
                                        return message.error(error.message);
                                      }
                                    }
                                  })}
                                >
                                  Update
                                </Button>
                                <Button
                                  type="danger"
                                  onClick={() =>
                                    setStatus({
                                      id: null,
                                      stt: true,
                                    })
                                  }
                                  style={{ marginLeft: 10 }}
                                >
                                  Cancel
                                </Button>
                              </Form.Item>
                            </Form>
                          ) : (
                            <>
                              <span>
                                {item.point}
                                <StarOutlined style={{ color: "gold" }} />
                              </span>
                              <p>{item.description}</p>
                            </>
                          )
                        }
                        datetime={
                          <Tooltip title={item.createdAt}>
                            {item.createdAt}
                          </Tooltip>
                        }
                      />
                    </li>
                  )}
                />
                <Button
                  className={
                    pagination.limitPage <= comment.length
                      ? ""
                      : "btnShowOrHide"
                  }
                  onClick={() => {
                    setPagination({
                      ...pagination,
                      limitPage: pagination.limitPage + 5,
                    });
                  }}
                >
                  More...
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCourseComponent;
