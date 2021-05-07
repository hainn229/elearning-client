/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

import { Table } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Tabs,
  Input,
  Form,
  Upload,
  Modal,
  message,
  Select,
} from "antd";
import {
  getCourseWithContents,
  getDetailsCourse,
  postAddContent,
  uploadVideo,
} from "../../APIs";
const { TabPane } = Tabs;
const { Option } = Select;
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
  const courseID = props.courseId;
  const getCourseDetails = async () => {
    const results = await getDetailsCourse(courseID);
    if (results.status === 200) {
      setCoursesData(results.data.course);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseID]);
  const [coursesData, setCoursesData] = useState([]);

  const [isModalWatchVisible, setIsModalWatchVisible] = useState(false);
  const [urlContentPlay, setUrlContentPlay] = useState();

  const [contentsOfCourses, setContentsOfCourses] = useState([]);

  const getContentOfCourse = async () => {
    const result = await getCourseWithContents(courseID);
    if (result.status === 200) {
      setContentsOfCourses(result.data.contents);
    }
  };

  useEffect(() => {
    getContentOfCourse();
  }, [courseID]);

  const [urlVideos, setUrlVideos] = useState();
  const [uploadButton, setUploadButton] = useState(false);
  const uploadSingleVideo = {
    beforeUpload: (file) => {
      if (file.type === "video/mp4" || file.type === "video/webm") {
        return true;
      } else {
        return message.error(`${file.name} is not a video !`);
      }
    },
    onChange: async (info) => {
      if (info.fileList.length === 0) {
        setUploadButton(false);
      } else {
        setUploadButton(true);
        try {
          const formData = new FormData();
          formData.append("video", info.file);
          const result = await uploadVideo(formData);
          if (result.status === 200) {
            setUrlVideos(result.data.url);
          }
        } catch (error) {
          if (error.response) {
            return message.error(error.response.data.message);
          } else {
            return message.error(error.message);
          }
        }
      }
    },
  };

  const onFinishAddContent = async (dataContent) => {
    if (urlVideos === undefined) {
      return message.error(`Cannot find url video upload !`);
    } else {
      try {
        const result = await postAddContent({
          title: dataContent.title,
          description: dataContent.description,
          url: urlVideos,
          course_id: courseID,
        });
        if (result.status === 200) {
          message.success(` Add Content Successfully !`);
          return window.history.go();
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

  return (
    <>
      <br />
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
                      {/* <th>Actions</th> */}
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
                            {i.type === "Lecture" ? (
                              <Button
                                type="link"
                                onClick={() => {
                                  setUrlContentPlay(i.url);
                                  setIsModalWatchVisible(true);
                                }}
                              >
                                <EyeOutlined /> Watch Lecture
                              </Button>
                            ) : i.type === "Document" ? (
                              <Button
                                type="link"
                                onClick={() => {
                                  setUrlContentPlay(i.url);
                                  setIsModalWatchVisible(true);
                                }}
                              >
                                <EyeOutlined /> Watch Document
                              </Button>
                            ) : (
                              <Button
                                type="link"
                                onClick={() => {
                                  setUrlContentPlay(i.url);
                                  setIsModalWatchVisible(true);
                                }}
                              >
                                <EyeOutlined /> Watch Exercise
                              </Button>
                            )}
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
                      playsInline
                      src={urlContentPlay}
                      // autoPlay
                      // poster={urlContentPlay}
                    >
                      <BigPlayButton position="center" />
                    </Player>
                  </Row>
                </Modal>
              </TabPane>
              <TabPane tab="Add Content" key="2">
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
                    <Upload {...uploadSingleVideo} maxCount={1}>
                      <Button disabled={uploadButton}>
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
