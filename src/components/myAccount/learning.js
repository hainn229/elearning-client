import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import queryString from "query-string";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";

import InfiniteScroll from "react-infinite-scroller";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

import { UserOutlined, StarOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  List,
  Button,
  Divider,
  Tabs,
  Form,
  Progress,
  Rate,
  Comment,
  Tooltip,
} from "antd";
const { TabPane } = Tabs;
const desc = [1, 2, 3, 4, 5];
const LearningComponent = (props) => {
  useAuth();
  const history = useHistory();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const courseID = props.courseId;
  const [courseDetails, setCourseDetails] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDetailsCourse = async () => {
    const result = await axios.get(
      `https://api--elearning.herokuapp.com/courses/${courseID}`,
      // `http://localhost:4000/courses/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCourseDetails(result.data.course);
  };

  const [comment, setComment] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 5,
  });
  const [totalItems, setTotalItems] = useState();
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
  const { register, handleSubmit } = useForm();
  const { register: register1, handleSubmit: handleSubmit1 } = useForm();

  const handleChangeRate = (value) => {
    setRate(value);
  };
  const handleChangeRateUpdate = (value) => {
    setRateUpdate(value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getComments = async () => {
    const paramsKey = queryString.stringify(pagination);
    const result = await axios.get(
      `https://api--elearning.herokuapp.com/comments/${courseID}?${paramsKey}`,
      // `http://localhost:4000/comments/${courseID}?${paramsKey}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTotalItems(result.data.totalItems);
    setComment(result.data.comments);
  };
  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  useEffect(() => {
    getDetailsCourse(courseID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseID]);

  const [contents, setContents] = useState();
  const [lectureName, setLectureName] = useState();
  const [urlContent, setUrlContent] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getContentDetails = async () => {
    const result = await axios.get(
      `https://api--elearning.herokuapp.com/contents/${courseID}`,
      // `http://localhost:4000/contents/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setContents(result.data.contents);
    setLectureName(result.data.contents[0].title);
    setUrlContent(result.data.contents[0].url);
  };

  useEffect(() => {
    getContentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseID]);

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
                <Link to={`/user/library`}>My Courses</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Learn</Breadcrumb.Item>
              {courseDetails !== undefined ? (
                <Breadcrumb.Item>{courseDetails.course_title}</Breadcrumb.Item>
              ) : null}
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <Row>
            <Col flex="70%">
              <h3>Lecture: {lectureName}</h3>
            </Col>
            <Col flex="auto">
              <Progress
                style={{ marginLeft: 15 }}
                type="dashboard"
                percent={75}
                width={40}
              />{" "}
              Progress: 75 of 100 complete
            </Col>
          </Row>
          <br />
          <Row>
            <Col flex="70%">
              <Player
                // playsInline
                src={urlContent}
                // poster={urlContent}
              >
                <BigPlayButton position="center" />
              </Player>
              <Tabs
                defaultActiveKey="1"
                // onChange={() => {
                //   console.log("1");
                // }}
              >
                <TabPane tab="Overview" key="1">
                  {courseDetails !== undefined ? (
                    <>
                      <h3>{courseDetails.course_title}</h3>
                      <p>Level: {courseDetails.level}</p>
                      <p>Topic: {courseDetails.cat_id.cat_name}</p>
                    </>
                  ) : null}
                </TabPane>
                <TabPane tab="Description" key="2">
                  {courseDetails !== undefined ? (
                    <p>{courseDetails.description}</p>
                  ) : null}
                </TabPane>
              </Tabs>

              <Divider orientation="left">Comments</Divider>
              <Row>
                <Col flex="200px">
                  <Form
                    layout="vertical"
                    initialValues=""
                    requiredMark={true}
                    style={{
                      borderRight: "2px solid whitesmoke",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    <Form.Item
                      label="Average rating:"
                      required
                      tooltip="This is a required field"
                    >
                      <span>
                        <Rate
                          tooltips={desc}
                          onChange={handleChangeRate}
                          value={rate}
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
                          ref={register}
                          value={rate}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      required
                      tooltip="This is a required field"
                    >
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
                            return Alert.error(
                              `<div role="alert"> You need to be signed in to use this feature!</div>`,
                              {
                                html: true,
                                position: "top-right",
                                effect: "bouncyflip",
                              }
                            );
                          } else {
                            const userId = user._id;
                            await axios.post(
                              // `https://api--elearning.herokuapp.com/comments/add`,
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
                                },
                              }
                            );
                            Alert.success(
                              `<div role="alert"> Add comment successfully! </div>`,
                              {
                                html: true,
                                position: "top-right",
                                effect: "bouncyflip",
                              }
                            );
                            return history.go();
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
                    header={totalItems + " replies"}
                    itemLayout="horizontal"
                    dataSource={comment}
                    renderItem={(item) => (
                      <li>
                        <Comment
                          actions={
                            user._id === item.user_id._id
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
                                        // `https://api--elearning.herokuapp.com/comments/${commentId}`,
                                        `http://localhost:4000/comments/${commentId}`,
                                        {
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      );
                                      Alert.success(
                                        `<div role="alert"> Delete comment successfully! </div>`,
                                        {
                                          html: true,
                                          position: "top-right",
                                          effect: "bouncyflip",
                                        }
                                      );
                                      return history.go();
                                    }}
                                  >
                                    Delete
                                  </span>,
                                ]
                              : []
                          }
                          author={item.user_id.full_name}
                          avatar={
                            item.user_id.avatarUrl === null ? (
                              <UserOutlined style={{ fontSize: 30 }} />
                            ) : (
                              item.user_id.avatarUrl
                            )
                          }
                          content={
                            status.id === item._id && status.stt === false ? (
                              <Form
                                layout="vertical"
                                initialValues=""
                                requiredMark={true}
                              >
                                <Form.Item
                                  label="Average rating:"
                                  required
                                  tooltip="This is a required field"
                                >
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
                                <Form.Item
                                  label="Description"
                                  required
                                  tooltip="This is a required field"
                                >
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
                                    onClick={handleSubmit1(
                                      async (updateData) => {
                                        let commentId = item._id;
                                        let userId = user._id;
                                        await axios.put(
                                          // `https://api--elearning.herokuapp.com/comments/${commentId}`,
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
                                            },
                                          }
                                        );
                                        setStatus(true);
                                        Alert.success(
                                          `<div role="alert"> Update comment successfully! </div>`,
                                          {
                                            html: true,
                                            position: "top-right",
                                            effect: "bouncyflip",
                                          }
                                        );
                                        return history.go();
                                      }
                                    )}
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
            </Col>
            <Col flex="auto">
              <div style={{ height: 1000, overflow: "auto" }}>
                <InfiniteScroll
                  pageStart={0}
                  hasMore={true || false}
                  useWindow={false}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={contents}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <>
                              <Button
                                type="link"
                                onClick={() => {
                                  setLectureName(item.title);
                                  setUrlContent(item.url);
                                }}
                              >
                                {item.title}
                              </Button>
                              <br />
                              <p style={{ marginLeft: 15 }}>
                                {item.description}
                              </p>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default LearningComponent;
