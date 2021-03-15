import React from "react";
import {
  Layout,
  Card,
  Col,
  Row,
  Calendar,
  Button,
  List,
  Avatar,
  Tabs,
  Divider,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import CarouselComponent from "./carousel";
import BreadCrumbComponent from "./breadcrumb";
import CoursesComponent from "../courses/index";

const { Content } = Layout;
const { Meta } = Card;

// Popular, recently courses
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const ContentComponent = () => {
  return (
    <Content>
      <CarouselComponent />
      <div className="container-content">
        <BreadCrumbComponent />
        <div className="site-layout-content">
          <div className="site-card-wrapper">
            <CoursesComponent />
          </div>
        </div>
        <br />
        <Row>
          <Col flex="300px">
            <h2> Calendar</h2>
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} />
            </div>
          </Col>
          <Col flex="auto">
            <h2> Popular Courses</h2>
            <List
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
            />
          </Col>
          <Col flex="auto">
            <h2> Recent Courses</h2>
            <List
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
            />
          </Col>
        </Row>

        {/* <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
        />
        <Alert
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
        />
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
        />
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        /> */}
        {/* <Modal
        title="Sign In"
        centered
        visible={this.state.modal1Visible}
        onOk={() => this.setModal1Visible(false)}
        onCancel={() => this.setModal1Visible(false)}
      ></Modal>
      <Modal
        title="Sign Up"
        centered
        visible={this.state.modal2Visible}
        onOk={() => this.setModal2Visible(false)}
        onCancel={() => this.setModal2Visible(false)}
      ></Modal> */}
      </div>
    </Content>
  );
};

export default ContentComponent;
