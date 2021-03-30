/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";

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
} from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

const validateDataSignin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address!")
    .required("Email address is required!"),
  password: yup.string().required("Password is required!"),
});
const validateDataSignup = yup.object().shape({
  full_name: yup.string().required("Full name is required!"),
  email: yup
    .string()
    .email("Invalid email address!")
    .required("Email address is required!"),
  password: yup
    .string()
    .min(6, "Minimum password length is six characters")
    .required("Password is required!"),
  re_password: yup
    .string()
    .min(6, "Minimum password length is six characters")
    .oneOf([yup.ref("password")], "Repeat password do not match!")
    .required("Password is required!"),
});

// const validateDataSignup = yup.object().shape({
//   full_name: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).required(),
//   re_password: yup
//     .string()
//     .min(6)
//     .oneOf([yup.ref("password")])
//     .required(),
// });

const HeaderComponent = () => {
  useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  // onSubmit Sign In
  const { register, handleSubmit } = useForm();

  // onSubmit Sign Up
  const { register: signin, handleSubmit: handleSubmitSignin } = useForm();

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
  const userId = user._id;

  const onSubmitSignin = async (dataInput) => {
    const result = await axios.post(
      // `https://api--elearning.herokuapp.com/auth/login`,
      `http://localhost:4000/auth/login`,
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
  };

  const onSubmitSignup = async (dataSignup) => {
    const result = await axios.post(
      // `https://api--elearning.herokuapp.com/auth/register`,
      `http://localhost:4000/auth/register`,
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
  };

  const responseGoogle = async (response) => {
    const result = await axios.post(
      // `https://api--elearning.herokuapp.com/auth/google`,
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
                  <Menu.Item style={{ textAlign: "center" }} key="setting:4">
                    <Link to={`/tutor/dashboard`}>Teach on Elearning</Link>
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
                      Sign Out
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
        width="70%"
        visible={isModal1Visible}
        onCancel={() => setIsModal1Visible(false)}
        footer={null}
      >
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img
                src="https://storage.googleapis.com/elearning-305907.appspot.com/images/signin-image.jpg"
                alt="sign in image"
              />
            </figure>
            <p className="signup-image-link">
              <Button
                type="link"
                onClick={() => {
                  setIsModal1Visible(false);
                  dispatch({ type: "MODAL_STATUS", payload: false });
                  setIsModal2Visible(true);
                }}
              >
                Create an account!
              </Button>
            </p>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>
            <form
              defaultValue={defaultValSignin}
              key={1}
              className="register-form"
              onSubmit={handleSubmitSignin(onSubmitSignin)}
            >
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email" />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  ref={signin}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock" />
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={signin}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  className="agree-term"
                />
                <label htmlFor="remember-me" className="label-agree-term">
                  <span>
                    <span />
                  </span>
                  Remember me
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  className="form-submit"
                  name="signin"
                  id="signin"
                  type="submit"
                  value="Sign In"
                />
              </div>
            </form>
            <div className="social-login">
              <span className="social-label" style={{ fontSize: 15 }}>
                Or login with
              </span>
              <ul className="socials">
                <li>
                  <GoogleLogin
                    clientId="998093637270-hhqclmlctiv0cakc2qeduofotciaaetk.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    buttonText="Google"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        centered={true}
        width="70%"
        visible={isModal2Visible}
        onCancel={() => setIsModal2Visible(false)}
        footer={null}
      >
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign Up</h2>
            <form
              defaultValue={defaultValSignup}
              key={2}
              className="register-form"
              id="register-form"
              onSubmit={handleSubmit(onSubmitSignup)}
            >
              <div className="form-group">
                <label htmlFor="full_name">
                  <i className="zmdi zmdi-account material-icons-name" />
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="Full name"
                  ref={register({ required: true })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email" />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email address"
                  ref={register({ required: true })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock" />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  ref={register({ required: true })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="re-password">
                  <i className="zmdi zmdi-lock-outline" />
                </label>
                <input
                  type="password"
                  name="re_password"
                  id="re_password"
                  placeholder="Repeat password"
                  required
                />
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Sign Up"
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img
                src="https://storage.googleapis.com/elearning-305907.appspot.com/images/signup-image.jpg"
                alt="sing up image"
              />
            </figure>
            <p className="signup-image-link">
              <Button
                type="link"
                onClick={() => {
                  setIsModal2Visible(false);
                  setIsModal1Visible(true);
                }}
              >
                I already have an account!
              </Button>
            </p>
          </div>
        </div>
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
