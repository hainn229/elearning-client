import React from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { Layout, Menu, Card, Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

const HeaderComponent = () => {
  useAuth();
  const signOut = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  console.log(user);

  return (
    <>
      <Header
        style={{
          position: "fixed",
          paddingLeft: "10vw",
          paddingRight: "10vw",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          className="logo"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          {/* <img src="https://i.pinimg.com/originals/65/c4/3a/65c43a0b6335904b9735afcd0f8807d6.png"/> */}
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
          {user._id ? (
            <SubMenu
              style={{ float: "right" }}
              key="SubMenu1"
              key="5"
              icon={<UserOutlined />}
            >
              <Menu.Item key="setting:1">
                <Avatar src={user.avatarUrl} />
                <span> {user.full_name}</span>
                <br />
                <span> {user.email}</span>
              </Menu.Item>
              <Menu.Item key="setting:2" disabled>
                Amount: $240
              </Menu.Item>
              <Menu.Item key="setting:3">My Library</Menu.Item>
              <Menu.Item key="setting:4">My Cart</Menu.Item>
              <Menu.Item key="setting:5">Wishlist</Menu.Item>
              <Menu.Item key="setting:6">Edit Profile</Menu.Item>
              <Menu.Item
                key="setting:7"
                danger
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Menu.Item>
            </SubMenu>
          ) : (
            <>
              <Menu
                style={{ float: "right" }}
                className="menu1"
                theme="dark"
                mode="horizontal"
              >
                <Button style={{ margin: "5px" }} href="/auth/login">
                  Sign In
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  type="primary"
                  href="/auth/register"
                >
                  Sign Up
                </Button>
              </Menu>
            </>
          )}
        </Menu>
        <Menu className="menu" theme="dark" mode="horizontal"></Menu>
      </Header>
    </>
  );
};

export default HeaderComponent;
