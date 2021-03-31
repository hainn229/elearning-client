/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";

import GoogleLogin from "react-google-login";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Modal,
  Popconfirm,
  List,
  Row,
  Col,
  Form,
  Input,
  Image,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  GoogleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;
const formSignin = {
  labelCol: { span: 6, style: { textAlign: "left" } },
  wrapperCol: {
    span: 18,
    style: { marginLeft: 20, marginTop: 10, width: "100%" },
  },
};
const formSignup = {
  labelCol: { span: 9, style: { textAlign: "left" } },
  wrapperCol: {
    span: 16,
    style: { marginLeft: 20, marginTop: 10, width: "100%" },
  },
};

const btn = {
  wrapperCol: { offset: 6 },
};

const HeaderComponent = () => {
  useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const defaultValSignin = {
    email: "",
    password: "",
  };
  const defaultValSignup = {
    full_name: "",
    email: "",
    password: "",
    re_password: "",
  };
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  // eslint-disable-next-line no-unused-vars
  const userId = user._id;

  const onFinishSignin = async (dataInput) => {
    try {
      const result = await axios.post(
        `https://api--elearning.herokuapp.com/auth/login`,
        // `http://localhost:4000/auth/login`,
        {
          email: dataInput.email,
          password: dataInput.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.data) {
        localStorage.setItem("token", result.data.token);
        setIsModal1Visible(false);
        dispatch({ type: "LOGIN_DATA", payload: result.data.user });
      }
      Alert.success(
        `<div role="alert"> Welcome ${result.data.user.full_name} to Elearning! </div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
      return history.push();
    } catch (error) {
      return Alert.error(
        `<div role="alert">${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    }
  };

  const onFinishSignup = async (dataSignup) => {
    try {
      const result = await axios.post(
        `https://api--elearning.herokuapp.com/auth/register`,
        // `http://localhost:4000/auth/register`,
        {
          full_name: dataSignup.full_name,
          email: dataSignup.email,
          password: dataSignup.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        setIsModal2Visible(false);
      }
      Alert.success(`<div role="alert"> ${result.data.message}</div>`, {
        html: true,
        position: "top-right",
        effect: "bouncyflip",
      });
      return history.push();
    } catch (error) {
      return Alert.error(
        `<div role="alert">${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    }
  };

  const responseGoogle = async (response) => {
    try {
      const result = await axios.post(
        `https://api--elearning.herokuapp.com/auth/google`,
        // `http://localhost:4000/auth/google`,
        {
          access_token: response.accessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        dispatch({ type: "LOGIN_DATA", payload: result.data.user });
        setIsModal1Visible(false);
        Alert.success(
          `<div role="alert"> Welcome ${result.data.user.full_name} to Elearning! </div>`,
          {
            html: true,
            position: "top-right",
            effect: "bouncyflip",
          }
        );
        return history.push();
      }
    } catch (error) {
      return Alert.error(
        `<div role="alert">${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "bouncyflip",
        }
      );
    }
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Alert stack={{ limit: 1 }} />
      <Row justify="center" align="top">
        <div style={{ width: "1440px" }}>
          <div
            className="logo"
            style={{ marginTop: "16px", textAlign: "center" }}
          >
            <a href="/">
              <h1>Elearning</h1>
            </a>
            {/* <img src=""/> */}
          </div>
          <Menu
            style={{ fontSize: "18px" }}
            className="menu"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            {!user.email ? (
              <>
                <Menu
                  style={{ float: "right" }}
                  className="menu1"
                  theme="dark"
                  mode="horizontal"
                >
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setIsModal1Visible(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsModal2Visible(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </Menu>
                <Menu
                  style={{ float: "right" }}
                  className="menu1"
                  theme="dark"
                  mode="horizontal"
                >
                  <div className="demo">
                    <div style={{ marginLeft: 70, whiteSpace: "nowrap" }}>
                      <Popconfirm
                        placement="bottomRight"
                        icon={<p />}
                        cancelText="Continue shoping"
                        okText={"Go to Cart"}
                        title={
                          <>
                            <List></List>
                            <h5>Total: $ 240.00</h5>
                          </>
                        }
                        onCancel={() => {
                          console.log("Continue shoping");
                        }}
                        onConfirm={() => {
                          console.log("Go to cart");
                        }}
                      >
                        <ShoppingCartOutlined
                          style={{
                            fontSize: 25,
                            marginRight: "20px",
                            marginTop: "5px",
                          }}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </Menu>
              </>
            ) : (
              <>
                <SubMenu
                  style={{ float: "right" }}
                  key="SubMenu"
                  title={
                    user.avatarUrl === null ? (
                      <>
                        <span style={{ marginRight: "10px" }}>
                          {user.full_name}
                        </span>
                        <Avatar
                          size="large"
                          src={<UserOutlined style={{ fontSize: 25 }} />}
                        />
                      </>
                    ) : (
                      <>
                        <span style={{ marginRight: "10px" }}>
                          {user.full_name}
                        </span>
                        <Avatar size="large" src={user.avatarUrl} />
                      </>
                    )
                  }
                >
                  <Menu.Item style={{ textAlign: "center" }} key="setting:1">
                    Amount: $ 240
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: "center" }} key="setting:2">
                    <Link to={`/user/edit`}>Edit Profile</Link>
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: "center" }} key="setting:3">
                    <Link to={`/user/library`}>My Library</Link>
                  </Menu.Item>
                  <Menu.Item style={{ marginBottom: 20 }} key="setting:4">
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      danger
                      onClick={() => {
                        signOut();
                      }}
                    >
                      <LogoutOutlined /> Sign Out
                    </Button>
                  </Menu.Item>
                </SubMenu>

                <Menu
                  style={{ float: "right" }}
                  className="menu1"
                  theme="dark"
                  mode="horizontal"
                >
                  <div className="demo">
                    <div style={{ marginLeft: 70, whiteSpace: "nowrap" }}>
                      <Popconfirm
                        placement="bottomRight"
                        icon={<p />}
                        cancelText="Continue shoping"
                        okText={"Go to Cart"}
                        title={
                          <>
                            <List></List>
                            <h5>Total: $ 240.00</h5>
                          </>
                        }
                        onCancel={() => {
                          console.log("Continue shoping");
                        }}
                        onConfirm={() => {
                          console.log("Go to cart");
                        }}
                      >
                        <ShoppingCartOutlined
                          style={{
                            fontSize: 25,
                            marginRight: "20px",
                            marginTop: "5px",
                          }}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </Menu>
              </>
            )}
          </Menu>
        </div>
      </Row>
      <Modal
        centered={true}
        width={900}
        visible={isModal1Visible}
        onCancel={() => setIsModal1Visible(false)}
        footer={null}
      >
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: 50, marginBottom: 50 }}
        >
          <Col>
            <Image
              src="https://storage.googleapis.com/elearning-305907.appspot.com/images/signin-image.jpg"
              preview={false}
              alt="Sign In Image"
              width={400}
            />
            <br />
            <Button
              type="link"
              onClick={() => {
                setIsModal1Visible(false);
                setIsModal2Visible(true);
              }}
              style={{ marginLeft: "30%" }}
            >
              Create an account !
            </Button>
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Form
              {...formSignin}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinishSignin}
              // onFinishFailed={onFinishFailed}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              initialValues={defaultValSignin}
            >
              <h1 style={{ textAlign: "center" }}>Sign In</h1>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...btn}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 20, width: 100 }}
                >
                  <LoginOutlined /> Sign In
                </Button>
              </Form.Item>
            </Form>
            <p style={{ textAlign: "center" }}>Or </p>
            <GoogleLogin
              icon={false}
              clientId="998093637270-hhqclmlctiv0cakc2qeduofotciaaetk.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <>
                  <Button
                    type="primary"
                    danger
                    onClick={renderProps.onClick}
                    style={{ marginLeft: 50, height: 40, fontSize: 16 }}
                    shape="round"
                  >
                    <GoogleOutlined /> Sign In With Google
                  </Button>
                </>
              )}
            />
          </Col>
        </Row>
      </Modal>
      <Modal
        centered={true}
        width={1000}
        visible={isModal2Visible}
        onCancel={() => setIsModal2Visible(false)}
        footer={null}
      >
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: 60, marginBottom: 60 }}
        >
          <Col>
            <Form
              {...formSignup}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinishSignup}
              // onFinishFailed={onFinishFailed}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              initialValues={defaultValSignup}
            >
              <h1 style={{ textAlign: "center" }}>Sign Up</h1>
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    mix: 6,
                    required: true,
                    message:
                      "Please input your password, minimum is 6 characters!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="re_password"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...btn}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 20, width: 100 }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Image
              src="https://storage.googleapis.com/elearning-305907.appspot.com/images/signup-image.jpg"
              preview={false}
              alt="Sign In Image"
              width={400}
            />
            <br />
            <Button
              type="link"
              onClick={() => {
                setIsModal2Visible(false);
                setIsModal1Visible(true);
              }}
              style={{ marginLeft: "25%" }}
            >
              I already have an account !
            </Button>
          </Col>
        </Row>
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
