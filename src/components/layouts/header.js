/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import GoogleLogin from "react-google-login";
import { PaypalCheckout } from "../paypal/index";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Modal,
  Drawer,
  List,
  Row,
  Col,
  Form,
  Input,
  Image,
  message,
  Popconfirm,
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

const HeaderComponent = (props) => {
  useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("token");
  const [isModalSignIn, setIsModalSignIn] = useState(false);
  const [isModalSignUp, setIsModalSignUp] = useState(false);
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
        `http://localhost:4000/auth/login`,
        {
          email: dataInput.email,
          password: dataInput.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );
      if (result.data) {
        if (result.data.user.role === "ADMIN") {
          return message.error(
            "Please sign in with an user account!"
          );
        } else if (result.data.user.status === false) {
          return message.error("Your account has been locked!");
        } else {
          localStorage.setItem("token", result.data.token);
          setIsModalSignIn(false);
          dispatch({ type: "LOGIN_DATA", payload: result.data.user });
          message.success(
            `Welcome ${result.data.user.full_name} to Elearning!`,
            3
          );
        }
      }
      return history.push();
    } catch (error) {
      if (error.response) {
        return message.error(`${error.response.data.message}`);
      } else {
        return message.error(
          `Could not a user with an entered email address !`
        );
      }
    }
  };

  const onFinishSignup = async (dataSignup) => {
    try {
      const result = await axios.post(
        `http://localhost:4000/auth/register`,
        {
          full_name: dataSignup.full_name,
          email: dataSignup.email,
          password: dataSignup.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );
      if (result.status === 200) {
        setIsModalSignUp(false);
      }
      message.success(`${result.data.message}`);
      return history.push();
    } catch (error) {
      if (error.response) {
        return message.error(`${error.response.data.message}`);
      } else {
        return message.error(`${error.message}`);
      }
    }
  };

  const responseGoogle = async (response) => {
    try {
      const result = await axios.post(
        `http://localhost:4000/auth/google`,
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
        setIsModalSignIn(false);
        message.success(
          `Welcome ${result.data.user.full_name} to Elearning!`,
          5
        );
        return history.push();
      }
    } catch (error) {
      return message.error(`${error.response.data.message}`);
    }
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cart, setCart] = useState();
  const [totalCart, setTotalCart] = useState(0);

  const [deleteStatus, setDeleteStatus] = useState(false);
  const getCart = async () => {
    if (user.email) {
      try {
        const result = await axios.get(
          `http://localhost:4000/orders/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        const listCart = result.data.cart;
        setTotalCart(
          listCart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.course_id.price;
          }, totalCart)
        );
        setCart(result.data.cart);
      } catch (error) {
        return message.error(error.response.data.message);
      }
    }
  };
  const updateStatus = async () => {
    for (let i = 0; i <= cart.length; i++) {
      await axios.put(
        `http://localhost:4000/orders/${cart[i]._id}`,
        {
          status: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );
    }
    return message.success(`Update Status Succesfully !`);
  };

  const updateAmount = async () => {
    await axios.put(
      `http://localhost:4000/auth/${user._id}`,
      {
        amount: user.amount - totalCart,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }
    );
    window.history.go();
    return message.success(`Checkout successfully !`);
  };

  // Paypal
  const onSuccess = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/users/updateAmount`,
        {
          paymentId: data.paymentID,
          user_id: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );
      updateStatus();
      message.success(`${response.data.message}`);
      return history.push();
    } catch (error) {
      return message.error(`${error.message}`);
    }
  };
  const transactionError = async (error) => {
    return message.error(`${error.message}`);
  };
  const transactionCanceled = async () => {
    return message.success(`Canceled Transaction Succesfully !`);
  };

  const [popconfirmVisible, setPopconfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const sttCart = props.sttCart;
  useEffect(() => {
    getCart();
  }, [userId, deleteStatus, sttCart]);

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
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
                      setIsModalSignIn(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsModalSignUp(true);
                    }}
                  >
                    Sign Up
                  </Button>
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
                    Amount: $ {user.amount}
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: "center" }} key="setting:2">
                    <Link to={`/tutor/dashboard`}>Teach on E-learning</Link>
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: "center" }} key="setting:3">
                    <Link to={`/user/edit`}>Edit Profile</Link>
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: "center" }} key="setting:4">
                    <Link to={`/user/library`}>My Library</Link>
                  </Menu.Item>
                  <Menu.Item style={{ marginBottom: 20 }} key="setting:5">
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
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => setDrawerVisible(true)}
                  >
                    My Cart
                  </Button>
                </Menu>
              </>
            )}
          </Menu>
        </div>
      </Row>
      <Modal
        centered={true}
        width={900}
        visible={isModalSignIn}
        onCancel={() => setIsModalSignIn(false)}
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
                setIsModalSignIn(false);
                setIsModalSignUp(true);
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
              <Form.Item {...btn}>
                <Link
                  to={`/auth/forgotPassword`}
                  onClick={() => setIsModalSignIn(false)}
                >
                  Forgot Password ?
                </Link>
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
        visible={isModalSignUp}
        onCancel={() => setIsModalSignUp(false)}
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
                setIsModalSignUp(false);
                setIsModalSignIn(true);
              }}
              style={{ marginLeft: "25%" }}
            >
              I already have an account !
            </Button>
          </Col>
        </Row>
      </Modal>
      <Drawer
        title={<h3>My Cart</h3>}
        width={500}
        placement="right"
        closable={true}
        onClose={() => {
          setPopconfirmVisible(false);
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
      >
        <List
          dataSource={cart}
          renderItem={(item) => (
            <>
              <Row>
                <Col style={{ width: 300 }}>
                  <Link
                    to={`/courses/${item.course_id._id}`}
                    onClick={() => setDrawerVisible(false)}
                  >
                    <h6>{item.course_id.course_title}</h6>
                  </Link>
                  <p>{item.course_id.cat_id.cat_name}</p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    $ {item.course_id.price}
                  </p>
                </Col>
                <Col style={{ float: "right", width: 100, marginRight: 10 }}>
                  <Button
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:4000/orders/${item._id}`,
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + jwt,
                          },
                        }
                      );

                      await axios.post(
                        `http://localhost:4000/wishlists/add`,
                        {
                          course_id: item.course_id._id,
                          user_id: user._id,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + jwt,
                          },
                        }
                      );
                      return message.success(`Move to Wishlist Succesfully !`);
                    }}
                  >
                    Move to Wishlist
                  </Button>
                  <Button
                    type="link"
                    onClick={async () => {
                      try {
                        const response = await axios.delete(
                          `http://localhost:4000/orders/${item._id}`,
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + jwt,
                            },
                          }
                        );
                        setDeleteStatus(!deleteStatus);
                        return message.success(response.data.message);
                      } catch (error) {
                        console.log(error);
                        return message.error(error.message);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
              <hr />
            </>
          )}
        />
        <h5>Total: $ {totalCart}</h5>
        <Row>
          <Popconfirm
            title={`Confirm Payment ?`}
            visible={popconfirmVisible}
            onConfirm={() => {
              setConfirmLoading(true);
              setTimeout(() => {
                setConfirmLoading(false);
                setPopconfirmVisible(false);
                updateAmount();
                updateStatus();
              }, 2000);
            }}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={() => setPopconfirmVisible(false)}
            placement="left"
          >
            <Button
              type="primary"
              danger
              style={{ marginRight: 20, width: "30%" }}
              onClick={() => {
                if (user.amount >= totalCart) {
                  setPopconfirmVisible(true);
                } else {
                  return message.warning(
                    "Your amount is not enough to checkout !"
                  );
                }
              }}
            >
              Checkout
            </Button>
          </Popconfirm>
          <br />
          <PaypalCheckout
            total={totalCart}
            onSuccess={onSuccess}
            transactionError={transactionError}
            transactionCanceled={transactionCanceled}
          />
        </Row>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
