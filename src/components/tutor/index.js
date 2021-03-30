/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import queryString from "query-string";
import axios from "axios";

import { Table } from "react-bootstrap";
import Alert from "react-s-alert";

import {
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
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
  Checkbox,
  Form,
  InputNumber,
  Divider,
  Select,
  Space,
} from "antd";
const { TabPane } = Tabs;
const { Search, TextArea } = Input;
const { Option } = Select;

const TutorComponent = () => {
  useAuth();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const tutorID = user._id;

  const [categoriesData, setCategoriesData] = useState([]);
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
    setCategoriesData(result.data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
    const results = await axios.get(
      // `https://api--elearning.herokuapp.com/courses?${keys}`,
      `http://localhost:4000/courses?${keys}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCoursesData(results.data.courses.docs);
  };

  useEffect(() => {
    getCoursesByTutorId();
  }, [filter]);

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
                      <th>Action</th>
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
                            <Space size="middle">
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
              </TabPane>
              <TabPane tab="Create New Course" key="2">
                <Form>
                  <Row>
                    <Col span={4} offset={4}>
                      <h6>Title</h6>
                    </Col>
                    <Col span={8}>
                      <Input
                        style={{ width: "100%" }}
                        placeholder="What is the title of the course?"
                        allowClear
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={4} offset={4}>
                      <h6>Topic</h6>
                    </Col>
                    <Col span={8}>
                      <Select
                        style={{ width: "100%" }}
                        placeholder="What is the topic of the course?"
                        dropdownRender={(menu) => (
                          <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "nowrap",
                                padding: 8,
                              }}
                            >
                              <Input
                                style={{ flex: "auto", width: "100%" }}
                                value={categoriesData.cat_name}
                                onChange={(event) => {
                                  categoriesData.cat_name = event.target.value;
                                  console.log(categoriesData.cat_name);
                                }}
                                allowClear
                              />
                              <a
                                style={{
                                  flex: "none",
                                  padding: "8px",
                                  display: "block",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  console.log(categoriesData.cat_name);
                                }}
                              >
                                <PlusOutlined /> Add Topic
                              </a>
                            </div>
                          </div>
                        )}
                      >
                        {categoriesData.map((category, index) => {
                          return (
                            <Option key={category._id}>
                              {category.cat_name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={4} offset={4}>
                      <h6>Level</h6>
                    </Col>
                    <Col span={8}>
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
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={4} offset={4}>
                      <h6>Price</h6>
                    </Col>
                    <Col span={8}>
                      <InputNumber
                        min={1}
                        style={{ width: "100%" }}
                        placeholder="Enter price for  your course, minimum is 1"
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={4} offset={4}>
                      <h6>Description</h6>
                    </Col>
                    <Col span={8}>
                      <TextArea
                        placeholder="Detailed description: (eg requirements, what you'll learn, etc.)"
                        rows={4}
                        style={{ width: "100%" }}
                        allowClear
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={12} offset={8}>
                      <Button type="primary">Submit</Button>
                    </Col>
                  </Row>
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
