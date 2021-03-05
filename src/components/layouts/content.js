import React from "react";
import {
  Layout,
  Card,
  Col,
  Row,
  Calendar,
  Alert,
  Button,
  List,
  Avatar,
  Tabs,
  Divider
} from "antd";

import CarouselComponent from "./carousel";
import BreadCrumbComponent from "./breadcrumb";

const { Content } = Layout;
const { Meta } = Card;

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
];
const data1 = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
];

const callback = (key) => {
  console.log(key);
};

const ContentComponent = () => {
  const [pagination, setPagination] = React.useState({
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
  return (
    <Content>
      <CarouselComponent />
      <div className="container-content">
        <BreadCrumbComponent />
        <div className="site-layout-content">
          <div className="site-card-wrapper">
            <Divider orientation="left">New Courses</Divider>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={data1}
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
                      title={<a href="">{item.title}</a>}
                      description="Price: $199"
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className="site-layout-content">
          <div className="site-card-wrapper">
            <h1>All Courses</h1>
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
                    xxl: 3,
                  }}
                  dataSource={data1}
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
                          title={<a href="">{item.title}</a>}
                          description="Price: $199"
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Business" key="1">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={data1}
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
                          title={<a href="">{item.title}</a>}
                          description="Price: $199"
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Graphics Design" key="2">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={data1}
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
                          title={<a href="">{item.title}</a>}
                          description="Price: $199"
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Web Development" key="3">
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={data1}
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
                          title={<a href="">{item.title}</a>}
                          description="Price: $199"
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
            </Tabs>
            <Button onClick={() => showMore()}>More...</Button>
          </div>
        </div>
        <br />
        <Row>
          <Col className="gutter-row" span={6}>
            <h2> Calendar</h2>
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} />
            </div>
          </Col>
          <Col className="gutter-row" span={9}>
            <h2> Popular Courses</h2>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col className="gutter-row" span={9}>
            <h2> Recent Courses</h2>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
