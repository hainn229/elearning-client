import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { useForm } from "react-hook-form";
import axios from "axios";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";

import {
  // eslint-disable-next-line no-unused-vars
  PlusOutlined,
  HeartOutlined,
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  List,
  Card,
  Button,
  Divider,
  Tabs,
  Form,
  Radio,
  Upload,
  Input,
  DatePicker,
  message,
  Image,
  Avatar,
} from "antd";
const { TabPane } = Tabs;

const { Meta } = Card;
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

const MyAccountComponent = () => {
  useAuth();
  // const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const userId = user._id;
  const history = useHistory();
  const [urlAvt, setUrlAvt] = useState();
  const onSubmitUpdate = async (updateInfo) => {
    await axios.put(
      `https://api--elearning.herokuapp.com/auth/${userId}`,
      // `http://localhost:4000/auth/${userId}`,
      {
        full_name: updateInfo.full_name,
        gender: updateInfo.gender,
        date_of_birth: updateInfo.date_of_birth._d,
        avatarUrl: urlAvt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    Alert.success(`<div role="alert">Update Successfully !</div>`, {
      html: true,
      position: "top-right",
      effect: "bouncyflip",
    });
    return history.go();
  };

  const onChangeAvatar = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const result = await axios.post(
      `https://api--elearning.herokuapp.com/upload/images`,
      // `http://localhost:4000/upload/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setUrlAvt(result.data.url);
  };

  const onSubmitUpdatePassword = async (updateInfo) => {
    await axios.put(
      `https://api--elearning.herokuapp.com/auth/updatePassword`,
      // `http://localhost:4000/auth/updatePassword`,
      {
        cur_password: updateInfo.cur_password,
        new_password: updateInfo.new_password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    Alert.success(
      `<div role="alert">Password Has Been Updated Successfully !</div>`,
      {
        html: true,
        position: "top-right",
        effect: "bouncyflip",
      }
    );
    return history.go();
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
              <Breadcrumb.Item>{user.full_name}</Breadcrumb.Item>
              <Breadcrumb.Item>Student</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <Tabs style={{ height: "100%", marginBottom: 40 }}>
            <TabPane tab={<h6>Edit Profile</h6>} key="1">
              <Form {...form} name="basic" onFinish={onSubmitUpdate}>
                <Form.Item label="Email address">
                  {/* <Input defaultValue={user.email} disabled /> */}
                  <p>{user.email}</p>
                </Form.Item>

                <Form.Item
                  label="Full name"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name !",
                    },
                  ]}
                >
                  <Input placeholder={user.full_name} />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    { required: true, message: "Please select gender !" },
                  ]}
                >
                  <Radio.Group
                    style={{ marginTop: 10 }}
                    defaultValue={user.gender ? user.gender : ""}
                  >
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Birthday"
                  name="date_of_birth"
                  rules={[
                    { required: true, message: "Please input your birthday !" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Select your birthday"
                  />
                </Form.Item>
                <Form.Item
                  label="Avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your avatar, maximum is 5MB !",
                    },
                  ]}
                >
                  <Upload
                    onChange={(e) => {
                      onChangeAvatar(e.file);
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
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            {user.password ? (
              <TabPane tab={<h6>Change Password</h6>} key="2">
                <Form {...form} name="basic" onFinish={onSubmitUpdatePassword}>
                  <Form.Item
                    label="Current Password"
                    name="cur_password"
                    hasFeedback
                    rules={[
                      {
                        min: 6,
                        required: true,
                        message: "Please input your current password !",
                      },
                    ]}
                  >
                    <Input.Password allowClear />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="new_password"
                    hasFeedback
                    rules={[
                      {
                        min: 6,
                        required: true,
                        message: "Please input your password, minimum is 6 !",
                      },
                    ]}
                  >
                    <Input.Password allowClear />
                  </Form.Item>

                  <Form.Item
                    label="Confirm New Password"
                    name="re_password"
                    dependencies={["new_password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please input confirm password !",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("new_password") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match !"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password allowClear />
                  </Form.Item>

                  <Form.Item {...btn}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: 20, width: 100 }}
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            ) : (
              ""
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MyAccountComponent;
