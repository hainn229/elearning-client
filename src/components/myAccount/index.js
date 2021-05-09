/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import {
  postUpdatePassword,
  putUpdateUser,
  uploadImage,
} from "../../APIs/index";

import { UploadOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Tabs,
  Form,
  Radio,
  Upload,
  Input,
  DatePicker,
  message,
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

const MyAccountComponent = () => {
  useAuth();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const [urlAvt, setUrlAvt] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const onChangeAvatar = async (e) => {
    try {
      if (e.fileList.length === 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
        const formData = new FormData();
        formData.append("image", e.file);
        const result = await uploadImage(formData);
        if (result.status === 200) {
          setUrlAvt(result.data.url);
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
  const onSubmitUpdate = async (updateInfo) => {
    try {
      const result = await putUpdateUser(user._id, {
        full_name: updateInfo.full_name,
        gender: updateInfo.gender,
        date_of_birth: updateInfo.date_of_birth._d,
        avatarUrl: urlAvt,
      });
      if (result.status === 200) {
        message.success(result.data.message);
        return window.history.go();
      }
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.message);
      } else {
        return message.error(error.message);
      }
    }
  };

  const onSubmitUpdatePassword = async (updateInfo) => {
    try {
      const result = await postUpdatePassword({
        id: user._id,
        cur_password: updateInfo.cur_password,
        new_password: updateInfo.new_password,
      });
      if (result.status === 200) {
        message.success(result.data.message);
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
                  {/* <p>{user.email}</p> */}
                  <Input value={user.email} disabled />
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
                    defaultValue={user.gender ? user.gender : "Male"}
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
                      onChangeAvatar(e);
                    }}
                  >
                    <Button disabled={isDisabled}>
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
