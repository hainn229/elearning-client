/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";

import {} from "@ant-design/icons";
import { Breadcrumb, Row, Col, Button, Form, Input, Modal } from "antd";

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
  const [modalResetByEmail, setModalResetByEmail] = useState(false);
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
          <h6>
            Please select one of the following options to reset your password!
          </h6>
          <hr />
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
          <Button type="link" onClick={() => setModalResetByEmail(true)}>
            Reset Password by Email
          </Button>
          <br />
          <Button type="link">Reset Password by Question</Button>
        </div>
        <Modal
          title="Reset Password by Email"
          centered={true}
          width={400}
          visible={modalResetByEmail}
          onCancel={() => setModalResetByEmail(false)}
          footer={null}
        >
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
        </Modal>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;
