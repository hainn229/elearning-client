import React from "react";
import BreadCrumbComponent from "../layouts/breadcrumb";
import { Layout } from "antd";
const { Content, Sider } = Layout;


const DetailsCourses = () => {
  return (
    <> 
        <Sider></Sider>
        <BreadCrumbComponent></BreadCrumbComponent>
        <Content></Content>
    </>
  );
};

export default DetailsCourses;
