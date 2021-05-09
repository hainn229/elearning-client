/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import {} from "@ant-design/icons";
import { Breadcrumb, Row, Col, Button, Form, Input, message } from "antd";
import { postForgotPassword, postResetPassword } from "../../APIs";

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
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const onFinishForgotPassword = async (data) => {
    try {
      const result = await postForgotPassword(data);
      if (result.status === 200) {
        return message.success(result.data.message);
      }
    } catch (error) {
      if (error.response) {
        return message.error(error.response.data.message);
      } else {
        return message.error(error.message);
      }
    }
  };

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
        <div className="getOTP" style={{ width: "100%" }}>
          <Form {...form} name="basic" onFinish={onFinishForgotPassword}>
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
