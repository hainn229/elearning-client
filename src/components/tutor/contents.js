/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

import { Table } from "react-bootstrap";
import Alert from "react-s-alert";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

import {
  DeleteOutlined,
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Tabs,
  Input,
  Form,
  Upload,
  Space,
  Modal,
} from "antd";
const { TabPane } = Tabs;
const form = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 12,
    style: { marginLeft: 20, marginTop: 10 },
  },
};
const btn = {
  wrapperCol: { offset: 6 },
};
const ContentsOfCourseComponent = (props) => {
  useAuth();
  const history = useHistory();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const courseID = props.courseId;
  const getCourseDetails = async () => {
    const results = await axios.get(
      // `https://api--elearning.herokuapp.com/courses/${courseID}`,
      `http://localhost:4000/courses/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCoursesData(results.data.course);
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseID]);
  const [coursesData, setCoursesData] = useState([]);

  const [isModalWatchVisible, setIsModalWatchVisible] = useState(false);
  const [urlContentPlay, setUrlContentPlay] = useState();

  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [contentIdEdit, setContentIdEdit] = useState();

  const [contentsOfCourses, setContentsOfCourses] = useState([]);
  const [contentDetails, setContentDetails] = useState();

  const getContentOfCourse = async () => {
    const result = await axios.get(
      `http://localhost:4000/contents/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setContentsOfCourses(result.data.contents);
  };

  useEffect(() => {
    getContentOfCourse();
  }, [courseID]);

  const getContentDetails = async () => {
    if (contentIdEdit !== undefined) {
      const contentId = contentIdEdit;

      const result = await axios.get(
        `http://localhost:4000/contents/details/${contentId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setContentDetails(result.data.content);
    }
  };

  useEffect(() => {
    getContentDetails();
  }, [contentIdEdit]);

  const [urlVideos, setUrlVideos] = useState();
  const onChangeUploadVideo = async (file) => {
    if (file.type === "video/mp4" || file.type === "video/webm") {
      const formData = new FormData();
      formData.append("video", file);
      const result = await axios.post(
        `http://localhost:4000/upload/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUrlVideos(result.data.url);
    } else {
      return Alert.error(
        `<div role="alert"> ${file.name} is not a mp4 or webm video !</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    }
  };

  const onFinishAddContent = async (dataContent) => {
    if (urlVideos === undefined) {
      return Alert.error(
        `<div role="alert"> Cannot fine url video upload !</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    } else {
      await axios.post(
        `http://localhost:4000/contents/add`,
        {
          title: dataContent.title,
          description: dataContent.description,
          url: urlVideos,
          course_id: courseID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Alert.success(`<div role="alert"> Add Content Successfully !</div>`, {
        html: true,
        position: "top-right",
        effect: "bouncyflip",
      });
      return history.go();
    }
  };

  const onFinishEditContent = async (dataContent) => {
    if (urlVideos === undefined) {
      return Alert.error(
        `<div role="alert"> Cannot fine url video upload !</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    } else {
      await axios.put(
        `http://localhost:4000/contents/${contentIdEdit}`,
        {
          title: dataContent.title,
          description: dataContent.description,
          url: urlVideos,
          course_id: courseID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Alert.success(`<div role="alert"> Update Content Successfully !</div>`, {
        html: true,
        position: "top-right",
        effect: "bouncyflip",
      });

      setIsModalEditVisible(false);
      return history.go();
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
                <Link to={`/tutor/dashboard`}>Tutor</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{coursesData.course_title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="List Contents" key="1">
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Video</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentsOfCourses.map((i) => {
                      return (
                        <tr>
                          <td>
                            <p>{i.title}</p>
                          </td>
                          <td>{i.description}</td>
                          <td>
                            <Button
                              type="link"
                              onClick={() => {
                                setUrlContentPlay(i.url);
                                setIsModalWatchVisible(true);
                              }}
                            >
                              <EyeOutlined /> Watch Lecture
                            </Button>
                          </td>
                          <td>
                            <Space size="middle">
                              <Button
                                type="primary"
                                onClick={() => {
                                  setContentIdEdit(i._id);
                                  setIsModalEditVisible(true);
                                }}
                              >
                                <EditOutlined /> Edit
                              </Button>
                              <Button type="primary" danger>
                                <DeleteOutlined /> Delete
                              </Button>
                            </Space>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Modal
                  title="Watch Lecture"
                  width={1100}
                  visible={isModalWatchVisible}
                  onCancel={() => {
                    setUrlContentPlay();
                    setIsModalWatchVisible(false);
                  }}
                  footer={null}
                >
                  <Row justify="center" style={{ marginBottom: 20 }}>
                    <Player
                      // playsInline
                      src={urlContentPlay}
                      // poster={urlContentPlay}
                    >
                      <BigPlayButton position="center" />
                    </Player>
                  </Row>
                </Modal>
                <Modal
                  title="Edit Content"
                  width={900}
                  visible={isModalEditVisible}
                  onCancel={() => {
                    setIsModalEditVisible(false);
                  }}
                  footer={null}
                >
                  {contentDetails === undefined ? (
                    ""
                  ) : (
                    <Form
                      {...form}
                      name="dynamic_form_nest_item"
                      onFinish={onFinishEditContent}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Title"
                        name={"title"}
                        rules={[
                          {
                            required: true,
                            message: "Missing title",
                          },
                        ]}
                      >
                        <Input placeholder={contentDetails.title} />
                      </Form.Item>
                      <Form.Item
                        label="Description"
                        name={"description"}
                        rules={[
                          {
                            required: true,
                            message: "Missing description",
                          },
                        ]}
                      >
                        <Input placeholder={contentDetails.description} />
                      </Form.Item>

                      <Form.Item
                        label="Video"
                        rules={[
                          {
                            required: true,
                            message: "Missing video",
                          },
                        ]}
                      >
                        <Upload
                          onChange={(e) => {
                            onChangeUploadVideo(e.file);
                          }}
                        >
                          <Button>
                            <UploadOutlined /> Click to upload
                          </Button>
                        </Upload>
                      </Form.Item>

                      <Form.Item {...btn}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginLeft: 20, width: 100 }}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </Modal>
              </TabPane>
              <TabPane tab="Add New Content" key="2">
                <Form
                  {...form}
                  name="dynamic_form_nest_item"
                  onFinish={onFinishAddContent}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Title"
                    name={"title"}
                    rules={[
                      {
                        required: true,
                        message: "Missing title",
                      },
                    ]}
                  >
                    <Input placeholder="Title of lecture" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name={"description"}
                    rules={[
                      {
                        required: true,
                        message: "Missing description",
                      },
                    ]}
                  >
                    <Input placeholder="Description for lecture" />
                  </Form.Item>

                  <Form.Item
                    label="Video"
                    name={"video"}
                    rules={[
                      {
                        required: true,
                        message: "Missing video",
                      },
                    ]}
                  >
                    <Upload
                      onChange={(e) => {
                        onChangeUploadVideo(e.file);
                      }}
                    >
                      <Button>
                        <UploadOutlined /> Click to upload
                      </Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item {...btn}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: 20, width: 100 }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentsOfCourseComponent;
