import React from "react";
import { Button } from 'antd';
import { LeftOutlined } from "@ant-design/icons";

const SignUpComponent = () => {
  return (
    <section class="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign Up</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="full_name">
                  <i className="zmdi zmdi-account material-icons-name" />
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email" />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock" />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="re-password">
                  <i className="zmdi zmdi-lock-outline" />
                </label>
                <input
                  type="password"
                  name="re_password"
                  id="re_password"
                  placeholder="Repeat your password"
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="agree-term"
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  <span>
                    <span />
                  </span>
                  I agree all statements in
                  <a href="#" className="term-service">
                    Terms of service
                  </a>
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  defaultValue="Register"
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <Button
              style={{ float: "right" }}
              type="link"
              icon={<LeftOutlined />}
              size="large"
              href="/"
            >
              Back
            </Button>
            <figure>
              <img
                src="https://storage.googleapis.com/elearning-305907.appspot.com/images/signup-image.jpg"
                alt="sing up image"
              />
            </figure>
            <a href="/auth/login" className="signup-image-link">
              I already have an account!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpComponent;
