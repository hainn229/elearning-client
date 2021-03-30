import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";

import { Link } from "react-router-dom";
import { Col, Row, Calendar, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import CarouselComponent from "./carousel";
import CoursesComponent from "../courses/index";

const ContentComponent = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 5,
  });
  const [popularCourses, setPopularCourses] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPopularCourses = async () => {
    const keys = queryString.stringify(pagination);
    const result = await axios.get(`http://localhost:4000/courses/popular?${keys}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPopularCourses(result.data.courses.docs);
  };
  
  // console.log(popularCourses);

  useEffect(() => {
    getPopularCourses();
  }, []);

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
          <Col flex={15}>
            <h2>Popular Courses</h2>
            <List
              itemLayout="horizontal"
              dataSource={popularCourses}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link to={`/courses/${item._id}`}>
                        {item.course_title}
                      </Link>
                    }
                    description={item.cat_id.cat_name}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col flex={15}>
            <h2> Recent Courses</h2>
            {/* <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        shape="square"
                        // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    }
                    title={<a href="">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContentComponent;
