import React from "react";
import { Layout } from "antd";
import HeaderComponent from "../components/layouts/header";
import FooterComponent from "../components/layouts/footer";
import ContentComponent from "../components/layouts/content";


export const HomePage = () => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <ContentComponent />
      <div style={{ borderTop: "2px solid #fff ", marginLeft: "10%", marginRight: "10%" }}></div>
      <FooterComponent />
    </Layout>
  );
};
