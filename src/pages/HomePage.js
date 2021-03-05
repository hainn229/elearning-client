import React from 'react';
const { Layout, Menu, Breadcrumb, Input, Carousel,  Avatar, Card, Image, Empty, Button, Col, Row, Tabs, Calendar, Alert, Modal, List, Pagination} = antd;
const { UserOutlined, SearchOutlined } = icons;
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;
const { TabPane } = Tabs;


function onPanelChange(value, mode) {
  console.log(value, mode);
};

function callback(key) {
  console.log(key);
};

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
};

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  }
];

class App extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  
  render() {
  return (
  <Layout className="layout" style={{margin: "50px"}}>
    <Content style={{ padding: '0 50px' }}>
      <Carousel autoplay>
        <div>
          <Image
            width="100%"
            height="auto"
            src="https://image.freepik.com/free-photo/back-school-education-banner-background_8087-1192.jpg"
          />
        </div>
        <div>
          <Image
            width="100%"
            height="auto"
            src="https://png.pngtree.com/thumb_back/fw800/background/20200809/pngtree-doodles-on-green-chalkboard-background-back-to-school-background-image_389839.jpg"
          />
        </div>
        <div>
           <Image
            width="100%"
            height="auto"
            src="https://png.pngtree.com/thumb_back/fh260/back_pic/03/59/82/4957a4a51714b83.jpg"
           />
        </div>
      </Carousel>
      <Carousel autoplay>
        <div style={{ width="100%", height="auto", textAlign: "center", backgroudImage: `url()`  }}>
          <h3>Los Angeles</h3>
          <p>LA is always so much fun!</p>
          <Button type="primary" shape="round" size="large">Start Learning Now</Button>
        </div>
        <div style={{ width="100%", height="auto", textAlign: "center", backgroudImage: `url()` }}>
          <h3>Los Angeles</h3>
          <p>LA is always so much fun!</p>
          <Button type="primary" shape="round" size="large">Start Learning Now</Button>
        </div>
        <div style={{ width="100%", height="auto", textAlign: "center", backgroudImage: `url()` }}>
          <h3>Los Angeles</h3>
          <p>LA is always so much fun!</p>
          <Button type="primary" shape="round" size="large">Start Learning Now</Button>
        </div>
      </Carousel>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <div className="site-card-wrapper">
          <h1>New Courses</h1>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                style={{ width: 250, height: 150}}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                  src=""
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="site-layout-content">
        <div className="site-card-wrapper">
          <h1>All Courses</h1>
          <Tabs defaultActiveKey="0" onChange={callback}>
            <TabPane tab="All" key="0">
              Content of Tab Pane 0
            </TabPane>
            <TabPane tab="Business" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Graphics Design" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Web Development" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
      <br />
      <Row>
        <Col span={18} offset={6}>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={500}
          />
        </Col>
      </Row>
      <br />
      <Row>
        {Calendar}
        <Col flex="320px">
          <div className="site-calendar-demo-card">
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </Col>
        <Col flex="auto">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
           </List.Item>
           )}
          />
        </Col>
      </Row>
      
      <Alert
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
        />
        
    </Content>
  </Layout>
  )}
};