import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import * as Types from "../../constants/constants";
import queryString from "query-string";
import axios from "axios";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";

import { useForm } from "react-hook-form";
// import { getCourses } from "../../api/api";
import {
  PlusOutlined,
  HeartOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Tabs, List, Card, Button, Space } from "antd";
const { Meta } = Card;

const callback = (key) => {
  // console.log(key);
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CoursesComponent = () => {
  const dispatch = useDispatch();
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPage: 10,
    keywords: "",
  });
  const showMore = () => {
    setPagination({
      ...pagination,
      limitPage: pagination.limitPage + 10,
    });
  };
  const getCourses = async () => {
    try {
      const paramsKey = queryString.stringify(pagination);
      const result = await axios.get(
        `https://api--elearning.herokuapp.com/courses?${paramsKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        dispatch({ type: "COURSES", payload: result.data.courses.docs });
      }
    } catch (err) {
      return Alert.error(
        `<div role="alert">${err.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    }
  };
  useEffect(() => {
    getCourses();
  }, [pagination, wishlistStatus]);
  const courses = useSelector((state) => {
    return state.coursesReducer.data;
  });
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });

  const addCourseToWishlist = async (id) => {
    if (!user._id) {
    } else {
      try {
        const result1 = await axios.post(
          `https://api--elearning.herokuapp.com/wishlists/add`,
          {
            course_id: id,
            user_id: user._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: "WISHLIST", payload: result1.data.wishlists.docs });
        setWishlistStatus(!wishlistStatus);
      } catch (err) {
        console.log(err);
        // return Alert.error(
        //   `<div role="alert">${err.response.data.message}</div>`,
        //   {
        //     html: true,
        //     position: "top-right",
        //     effect: "bouncyflip",
        //   }
        // );
      }
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="0" onChange={callback}>
        <Tabs.TabPane tab="All" key="0">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 5,
            }}
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
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                >
                  <Meta
                    title={<a href="">{item.course_title}</a>}
                    description={
                      <>
                        <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Price: ${item.price}
                          {"  "}
                        </p>
                        <p>Tutor: <a href="">{item.tutor_id.full_name}</a></p>
                        <p>
                          <IconText
                            icon={StarOutlined}
                            text={item.num_of_subscribers}
                            key="list-vertical-star-o"
                          />
                          <span> | </span>
                          <IconText
                            icon={MessageOutlined}
                            text="2"
                            key="list-vertical-message"
                          />
                        </p>
                      </>
                    }
                  />
                  <br />
                  <Button icon={<PlusOutlined />}>Add to Cart</Button>
                  <Button
                    onClick={() => addCourseToWishlist(item._id)}
                    style={{ float: "right" }}
                    shape="circle"
                    icon={<HeartOutlined />}
                    type={
                      item.wishlist.some(
                        (user_id) => user_id._id === user._id
                      )
                        ? "primary"
                        : ""
                    }
                    danger
                  />
                </Card>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Business" key="1"></Tabs.TabPane>
        <Tabs.TabPane tab="Graphics Design" key="2"></Tabs.TabPane>
        <Tabs.TabPane tab="Web Development" key="3"></Tabs.TabPane>
      </Tabs>
      <Button onClick={() => showMore()}>More...</Button>
    </>
  );
};
export default CoursesComponent;
