/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";


import {
} from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Form,
  Input,
} from "antd";
const form = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 12,
    style: { marginLeft: 20, marginTop: 10 },
  },
};

const btn = {
  wrapperCol: { offset: 6 },
};

const ForgotPasswordComponent = () => {
  useAuth();
  // const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const userId = user._id;
  const history = useHistory();

  return (
    <>
      <br />
      <br />
      <br />
      <div className="container-content">
        <Row>
          <Col flex={4}>
            <Breadcrumb style={{ margin: "16px 0", fontSize: "16px" }}>
              <Breadcrumb.Item>
                <Link to={`/`}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Forgot Password</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="site-layout-content" style={{ width: "100%" }}>
          <Form
            {...form}
            name="basic"
            // onFinish={onSubmitUpdatePassword}
          >
            <Form.Item
              label="Email Address"
              name="email"
              hasFeedback
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input a valid email address !",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
            
            <Form.Item {...btn}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 20, width: 100 }}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;
