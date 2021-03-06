import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SigninWithGoogle } from "../../api/api";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";

import GoogleLogin from "react-google-login";
import { Layout, Menu, Card, Input, Button, Avatar, Modal } from "antd";
import {} from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

const HeaderComponent = () => {
  useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

  const user = useSelector((state) => {
    return state.signInReducer.data;
  });

  const onSubmit = async (dataInput) => {
    try {
      const result = await axios.post(
        // `https://api--elearning.herokuapp.com/auth/login`,
        `http://localhost:5000/auth/login`,
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
      // const result = await Login(dataInput);
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
          timeout: 1000,
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
          timeout: 1000,
        }
      );
    }
  };
  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const result = await SigninWithGoogle({
        access_token: response.accessToken,
      });
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        dispatch({ type: "LOGIN_DATA", payload: result.data.user });
        Alert.success(
          `<div role="alert"> Welcome ${result.data.user.full_name} to Elearning! </div>`,
          {
            html: true,
            position: "top-right",
            effect: "bouncyflip",
            timeout: 1000,
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
          timeout: 1000,
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
        paddingLeft: "10vw",
        paddingRight: "10vw",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Alert stack={{ limit: 1 }} />
      <div className="logo" style={{ marginTop: "16px", textAlign: "center" }}>
        {/* <img src=""/> */}
        <h1>Elearning</h1>
      </div>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1" href="/">
          Home
        </Menu.Item>
        <SubMenu key="2" title="Categories">
          <Menu.Item key="setting:1">Business</Menu.Item>
          <Menu.Item key="setting:2">Graphics Design</Menu.Item>
          <Menu.Item key="setting:3">Web Development</Menu.Item>
        </SubMenu>
        <Menu.Item key="3" href="/courses/">
          Courses
        </Menu.Item>
        {!user.email ? (
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
        ) : (
          <SubMenu
            style={{ float: "right" }}
            key="SubMenu"
            key="5"
            title={
              <>
                <span style={{ marginRight: "10px" }}>{user.full_name}</span>
                <Avatar size="large" src={user.avatarUrl} />
              </>
            }
          >
            <Menu.Item key="setting:1">Amount: $ 240</Menu.Item>
            <Menu.Item key="setting:2">Edit Profile</Menu.Item>
            <Menu.Item key="setting:3">My Library</Menu.Item>
            <Menu.Item key="setting:4">My Cart</Menu.Item>
            <Menu.Item key="setting:5">Wishlist</Menu.Item>
            <Menu.Item
              key="setting:6"
              danger
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
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
                  setIsModal2Visible(true);
                }}
              >
                Create an account!
              </Button>
            </p>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}> 
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email" />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  ref={register}
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
                  ref={register}
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
            <div>
              <GoogleLogin
                clientId="998093637270-hhqclmlctiv0cakc2qeduofotciaaetk.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                buttonText="Or Sign In With Google"
              />
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
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="full_name">
                  <i className="zmdi zmdi-account material-icons-name" />
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="Full name"
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
                  placeholder="Your Email"
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
                  placeholder="Repeat your password"
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="agree-term"
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  <span>
                    <span />
                  </span>
                  I agree all statements in
                  <a href="#" className="term-service">
                    Terms of service
                  </a>
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  defaultValue="Register"
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
