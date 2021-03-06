/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { getCoursesPopular, getCoursesRecent } from "../../APIs";

import { Link } from "react-router-dom";
import { Col, Row, Calendar, List, message, Avatar, Space } from "antd";

import CarouselComponent from "./carousel";
import CoursesComponent from "../courses/index";
import { useSelector } from "react-redux";

const ContentComponent = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 5,
  });
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const [popularCourses, setPopularCourses] = useState([]);
  const getPopularCourses = async () => {
    try {
      const keys = queryString.stringify(pagination);
      const result = await getCoursesPopular(keys);
      if (result.status === 200) {
        setPopularCourses(result.data.courses.docs);
      }
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.message);
      } else {
        return message.error(error.message);
      }
    }
  };

  const [coursesRecent, setCoursesRecent] = useState();
  const getRecentCourses = async () => {
    if (user.email) {
      try {
        const result = await getCoursesRecent(user._id);
        if (result.status === 200) {
          setCoursesRecent(result.data.courses.recents);
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

  useEffect(() => {
    getPopularCourses();
    getRecentCourses(user._id);
  }, ["1"]);

  return (
    <div>
      <div className="container-content">
        <CarouselComponent />
        <CoursesComponent />
        <br />
        <Row justify="space-between">
          <Col flex={1}>
            <h2> Calendar</h2>
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} />
            </div>
          </Col>
          <Col flex={15} style={{ marginLeft: 10 }}>
            <h2>Popular Courses</h2>
            <List
              itemLayout="horizontal"
              bordered
              dataSource={popularCourses}
              renderItem={(item) => (
                <List.Item
                  extra={<img width={100} alt="logo" src={item.poster} />}
                >
                  <List.Item.Meta
                    title={
                      <Link to={`/courses/${item._id}`}>
                        <h6>{item.course_title}</h6>
                      </Link>
                    }
                    description={
                      <>
                        <p>{item.cat_id.cat_name}</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Price: $ {item.price}
                        </p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col flex={15} style={{ marginLeft: 10 }}>
            <h2> Recent Courses</h2>
            <List
              itemLayout="horizontal"
              bordered
              dataSource={coursesRecent}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <img width={100} alt="logo" src={item.course_id.poster} />
                  }
                >
                  <List.Item.Meta
                    title={
                      <Link to={`/courses/${item.course_id._id}`}>
                        <h6>{item.course_id.course_title}</h6>
                      </Link>
                    }
                    description={
                      <>
                        <p>{item.course_id.cat_id.cat_name}</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Price: $ {item.course_id.price}
                        </p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContentComponent;
