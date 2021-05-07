/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import queryString from "query-string";

import InfiniteScroll from "react-infinite-scroller";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

import {
  getDetailsCourse,
  getComments,
  getCourseWithContents,
  postAddComment,
  deleteComment,
  putUpdateComment,
} from "../../APIs/index";

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
  Rate,
  Comment,
  Tooltip,
  message,
} from "antd";
const { TabPane } = Tabs;
const desc = [1, 2, 3, 4, 5];
const LearningComponent = (props) => {
  useAuth();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const courseID = props.courseId;
  const [courseDetails, setCourseDetails] = useState();
  const getDetails = async () => {
    const result = await getDetailsCourse(courseID);
    if (result.status === 200) {
      setCourseDetails(result.data.course);
    }
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
  const getComment = async () => {
    try {
      const paramsKey = queryString.stringify(pagination);
      const result = await getComments(courseID, paramsKey);
      if (result.status === 200) {
        setTotalItems(result.data.totalItems);
        setComment(result.data.comments);
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
  useEffect(() => {
    getComment();
  }, [pagination, actionsStatus]);

  useEffect(() => {
    getDetails(courseID);
  }, [courseID]);

  const [contents, setContents] = useState();
  const [lectureName, setLectureName] = useState();
  const [urlContent, setUrlContent] = useState();
  const getContentDetails = async () => {
    try {
      const result = await getCourseWithContents(courseID);
      if (result.status === 200) {
        setContents(result.data.contents);
        setLectureName(result.data.contents[0].title);
        setUrlContent(result.data.contents[0].url);
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
    getContentDetails();
  }, [courseID]);

  const addComment = async (commentData) => {
    if (!user._id) {
      return message.warning(`You need to be signed in to use this feature!`);
    } else {
      if (commentData.rate === "" || commentData.description === "") {
        return message.warning(`Please fill in all the information!`);
      } else {
        try {
          const result = await postAddComment({
            course_id: courseID,
            user_id: user._id,
            point: commentData.rate,
            description: commentData.description,
          });
          if (result.status === 200) {
            setActionsStatus(!actionsStatus);
            return message.success(`Add comment successfully!`);
          }
        } catch (error) {
          if (error.response) {
            return message.error(error.response.data.message);
          } else {
            return message.error(error.message);
          }
        }
      }
    }
  };
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
          {/* <Row>
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
          </Row> */}
          <br />
          <Row>
            <Col flex="70%">
              <h3>Lecture: {lectureName}</h3>
              <Player
                // playsInline
                src={urlContent}
              >
                <BigPlayButton position="center" />
              </Player>
              <Tabs defaultActiveKey="1">
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
                        onClick={handleSubmit(addComment)}
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
                            user.email
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
                                        const result = await deleteComment(
                                          item._id
                                        );
                                        if (result.status === 200) {
                                          setActionsStatus(!actionsStatus);
                                          return message.success(
                                            `Delete comment successfully! `
                                          );
                                        }
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
                                    onClick={handleSubmit1(
                                      async (updateData) => {
                                        try {
                                          if (
                                            updateData.rate === "" ||
                                            updateData.description === ""
                                          ) {
                                            return message.warning(
                                              `You need to fill in the information for a comment!`
                                            );
                                          } else {
                                            let userId = user._id;
                                            const result = await putUpdateComment(
                                              item._id,
                                              {
                                                course_id: courseID,
                                                user_id: userId,
                                                point: updateData.rateUpdate,
                                                description:
                                                  updateData.description,
                                              }
                                            );
                                            if (result.status === 200) {
                                              setActionsStatus(!actionsStatus);
                                              setStatus(true);
                                              return message.success(
                                                ` Update comment successfully! `
                                              );
                                            }
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
