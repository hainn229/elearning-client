// import logo from './logo.svg';
// import './App.css';

import HeaderComponent from "./components/layouts/header";
import FooterComponent from "./components/layouts/footer";
import { Routers } from "./pages/Routers";
import { Layout } from "antd";
const { Content } = Layout;
const App = () => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Content>
        <Routers />
      </Content>
      <div
        style={{
          borderTop: "2px solid #fff ",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      ></div>
      <FooterComponent />
    </Layout>
  );
};

export default App;
