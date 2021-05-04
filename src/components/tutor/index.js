/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import queryString from "query-string";
import axios from "axios";

import { Table } from "react-bootstrap";

import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Tabs,
  Input,
  Checkbox,
  Form,
  InputNumber,
  Divider,
  Select,
  Upload,
  message,
} from "antd";
const { TabPane } = Tabs;
const { Search, TextArea } = Input;
const { Option } = Select;

const formStyle = {
  labelCol: { span: 2, style: { textAlign: "left" } },
  wrapperCol: {
    span: "auto",
    style: { marginLeft: 20, marginTop: 10, width: "100%" },
  },
};

const TutorComponent = () => {
  useAuth();
  const jwt = localStorage.getItem("token");
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const tutorID = user._id;
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const [categoriesData, setCategoriesData] = useState([]);

  const getCategories = async () => {
    const result = await axios.get(`http://localhost:4000/categories/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    setCategoriesData(result.data.categories);
  };

  useEffect(() => {
    getCategories();
  }, [1]);
  console.log(categoriesData);

  const [coursesData, setCoursesData] = useState([]);
  const [filter, setFilter] = useState({
    keywords: "",
    tutor: tutorID,
    level: "",
    currentPage: 1,
    limitPage: 10,
  });
  const getCoursesByTutorId = async () => {
    const keys = queryString.stringify(filter);
    const results = await axios.get(`http://localhost:4000/courses?${keys}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    setCoursesData(results.data.courses.docs);
  };

  useEffect(() => {
    getCoursesByTutorId();
  }, [filter]);

  const [urlPoster, setUrlPoster] = useState();
  const onChangePoster = async (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const result = await axios.post(
          `http://localhost:4000/upload/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUrlPoster(result.data.url);
        return message.success(`Upload Poster Success !`);
      } catch (error) {
        if (error.response) {
          return message.error(error.response.data.message);
        } else {
          return message.error(error.message);
        }
      }
    }
  };

  const onFinishCreateNewCourse = async (courseData) => {
    try {
      await axios.post(
        `http://localhost:4000/courses/add`,
        {
          course_title: courseData.title,
          cat_id: courseData.cat_id,
          level: courseData.level,
          price: courseData.price,
          description: courseData.description,
          tutor_id: user._id,
          status: false,
          poster: urlPoster,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );
      message.success(`Create Course Success !`);
      return window.history.go();
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.message);
      } else {
        return message.error(error.message);
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
              <Breadcrumb.Item>Tutor</Breadcrumb.Item>
              <Breadcrumb.Item>{user.full_name}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="My Courses" key="1">
                <Row>
                  <Search
                    style={{ margin: "8px 0", fontSize: "16px" }}
                    placeholder="Search course..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    value={filter.keywords}
                    onChange={(event) => {
                      setFilter({ ...filter, keywords: event.target.value });
                    }}
                  />
                </Row>
                <br />
                <Row>
                  <Col>Filter by:</Col>
                  <Col span={4} offset={1}>
                    <Checkbox
                      value="Beginning level"
                      onChange={(event) => {
                        if (event.target.checked === true) {
                          setFilter({ ...filter, level: event.target.value });
                        } else {
                          setFilter({ ...filter, level: "" });
                        }
                      }}
                    >
                      Beginning level
                    </Checkbox>
                  </Col>
                  <Col span={4} offset={1}>
                    <Checkbox
                      value="Intermediate level"
                      onChange={(event) => {
                        if (event.target.checked === true) {
                          setFilter({ ...filter, level: event.target.value });
                        } else {
                          setFilter({ ...filter, level: "" });
                        }
                      }}
                    >
                      Intermediate level
                    </Checkbox>
                  </Col>
                  <Col span={4} offset={1}>
                    <Checkbox
                      value="Advanced level"
                      onChange={(event) => {
                        if (event.target.checked === true) {
                          setFilter({ ...filter, level: event.target.value });
                        } else {
                          setFilter({ ...filter, level: "" });
                        }
                      }}
                    >
                      Advanced level
                    </Checkbox>
                  </Col>
                </Row>
                <br />
                <Table className="tableCourses">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Topics</th>
                      <th>Level</th>
                      <th>Subcribers</th>
                      <th>Price (USD)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesData.map((i) => {
                      return (
                        <tr>
                          <td>
                            <Link to={`/tutor/course/contents/${i._id}`}>
                              {i.course_title}
                            </Link>
                          </td>
                          <td>{i.cat_id.cat_name}</td>
                          <td>{i.level}</td>
                          <td>{i.num_of_subscribers}</td>
                          <td>{i.price}</td>
                          <td>
                            {i.status === true ? (
                              <p style={{ color: "green" }}>Active</p>
                            ) : (
                              <p style={{ color: "red" }}>Pending</p>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                {filter.limitPage <= coursesData.length ? (
                  <Button
                    onClick={() => {
                      setFilter({
                        ...filter,
                        limitPage: filter.limitPage + 5,
                      });
                    }}
                  >
                    More...
                  </Button>
                ) : (
                  ""
                )}
              </TabPane>
              <TabPane tab="Create New Course" key="2">
                  <Form
                    {...formStyle}
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishCreateNewCourse}
                  >
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Please input title",
                        },
                      ]}
                    >
                      <Input
                        placeholder="What is the title of the course?"
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      label="Topic"
                      name="cat_id"
                      rules={[
                        {
                          required: true,
                          message: "Please select category for course !",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="What is the topic of the course?"
                      >
                        {categoriesData.map((i) => {
                          return <Option key={i._id}>{i.cat_name}</Option>;
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="level"
                      label="Level"
                      rules={[
                        {
                          required: true,
                          message: "Please select level for course !",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        defaultValue="All levels"
                      >
                        <Option value="All levels">All levels</Option>
                        <Option value="Beginning level">Beginning level</Option>
                        <Option value="Intermediate level">
                          Intermediate level
                        </Option>
                        <Option value="Advanced level">Advanced level</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="price"
                      label="Price"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please input price for course !",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Enter price for  your course, minimum is 0"
                      />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        {
                          requireD: true,
                          message: "Please input desciption for course !",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Detailed description: (eg requirements, what you'll learn, etc.)"
                        rows={4}
                        style={{ width: "100%" }}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      label="Poster"
                      listType="picture-card"
                      className="avatar-uploader"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please upload your avatar, maximum is 5MB !",
                        },
                      ]}
                    >
                      <Upload
                        onChange={(e) => {
                          onChangePoster(e.file);
                        }}
                      >
                        <Button>
                          <UploadOutlined /> Click to upload
                        </Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: 20, width: 100 }}
                      >
                        Submit
                      </Button>
                      <Button
                        style={{ marginLeft: 20, width: 100 }}
                        onClick={onReset}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                  </Form>
              </TabPane>
              {/* <TabPane tab="Tab Title 3" key="3">
                <p>Content of Tab Pane 3</p>
              </TabPane> */}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorComponent;
