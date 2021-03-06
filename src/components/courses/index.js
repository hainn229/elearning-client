/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import {
  getAllCategories,
  getCoursesActive,
  postAddCourseRecent,
  postAddOrder,
  postAddToWishlist,
} from "../../APIs";
import { PlusOutlined, HeartOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Input,
  Tabs,
  List,
  Card,
  Button,
  Divider,
  message,
  Image,
} from "antd";

const { Meta } = Card;
const { TabPane } = Tabs;

const { Search } = Input;

const CoursesComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 10,
  });

  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResultsData, setSearchResultsData] = useState();
  const [filter, setFilter] = useState({
    keywords: "",
    category: "",
  });
  const [resultsFilter, setResultsFilter] = useState();

  const getAllUsers = async () => {
    
  }

  const search = async () => {
    const keys = queryString.stringify(filter);
    const result = await getCoursesActive(keys);
    if (result.status === 200) {
      setResultsFilter(result.data.courses.docs);
      setSearchResultsData(result.data.courses.docs);
    }
  };

  useEffect(() => {
    search();
  }, [filter]);

  const getCategories = async () => {
    const result = await getAllCategories();
    if (result.status === 200) {
      dispatch({ type: "CATEGORIES", payload: result.data.categories });
    }
  };

  const getCourses = async () => {
    const keys = queryString.stringify(pagination);
    const result = await getCoursesActive(keys);
    if (result.status === 200) {
      dispatch({ type: "COURSES", payload: result.data.courses.docs });
    }
  };

  const addToCart = async (id) => {
    if (user.email) {
      try {
        const response = await postAddOrder({
          user_id: user._id,
          course_id: id,
        });
        if (response.status === 200) {
          message.success(response.data.message);
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
    } else {
      return message.warning(`You need to be signed in to use this feature!`);
    }
  };
  const addToWishlist = async (id) => {
    try {
      if (!user.email) {
        return message.warning(`You need to be signed in to use this feature!`);
      } else {
        const response = await postAddToWishlist({
          user_id: user._id,
          course_id: id,
        });
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
      {/* SEARCH */}
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
              <List.Item
                key={item.course_title}
                extra={<Image src={item.poster} width={200} preview={false} />}
              >
                <List.Item.Meta
                  title={
                    <Link to={`/courses/${item._id}`}>{item.course_title}</Link>
                  }
                  description={
                    <>
                      <h6>Price: ${item.price}</h6>
                      <p>Level: {item.level}</p>
                      <p>
                        Tutor:{" "}
                        {item.tutor_id ? item.tutor_id.full_name : item.tutor}
                      </p>
                      <p>Topics: {item.cat_id.cat_name}</p>
                      {item.description}
                      <br />
                    </>
                  }
                />
                {item.content}
                <Button
                  type="primary"
                  style={{ marginRight: "10px" }}
                  icon={<PlusOutlined />}
                  onClick={() => addToCart(item._id)}
                >
                  Add to Cart
                </Button>
                <Button
                  shape="circle"
                  icon={<HeartOutlined />}
                  type="primary"
                  danger
                  onClick={() => addToWishlist(item._id)}
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
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
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
                      <Image
                        preview={false}
                        alt="poster"
                        src={item.poster}
                        style={{ width: 300, height: 200 }}
                      />
                    }
                  >
                    <Meta
                      title={
                        <>
                          <Link
                            to={`/courses/${item._id}`}
                            onClick={async () => {
                              if (user.email) {
                                const result = await postAddCourseRecent({
                                  course_id: item._id,
                                  user_id: user._id,
                                });
                                if (result.status === 200) {
                                  console.log(result.data);
                                }
                              }
                            }}
                          >
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
                            {item.tutor_id
                              ? item.tutor_id.full_name
                              : // <Link href={`/users/${item.tutor_id._id}`}>
                                //   {item.tutor_id.full_name}
                                // </Link>
                                item.tutor}
                          </p>
                        </>
                      }
                    />
                    <br />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => addToCart(item._id)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => addToWishlist(item._id)}
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
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 4,
                  xxl: 5,
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
                        <Image
                          preview={false}
                          alt="poster"
                          src={item.poster}
                          style={{ width: 300, height: 200 }}
                        />
                      }
                    >
                      <Meta
                        title={
                          <Link
                            onClick={async () => {
                              if (user.email) {
                                const result = await postAddCourseRecent({
                                  course_id: item._id,
                                  user_id: user._id,
                                });
                                if (result.status === 200) {
                                  console.log(result.data.message);
                                }
                              }
                            }}
                            to={`/courses/${item._id}`}
                          >
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
                              {item.tutor_id
                                ? item.tutor_id.full_name
                                : // <Link href={`/users/${item.tutor_id._id}`}>
                                  //   {item.tutor_id.full_name}
                                  // </Link>
                                  item.tutor}
                            </p>
                          </>
                        }
                      />
                      <br />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => addToCart(item._id)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => addToWishlist(item._id)}
                        style={{ float: "right" }}
                        shape="circle"
                        icon={<HeartOutlined />}
                        danger
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};
export default CoursesComponent;
