import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Login, SigninWithGoogle } from "../api/api";
import * as yup from "yup";
import Alert from "react-s-alert";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";
import { useAuth } from "../hooks/useAuth";
import { Redirect, useHistory } from "react-router-dom";

const defaultValuesLogin = {
  email: "",
  password: "",
};
const validationLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email address is required!"),
  password: yup.string().required("Please enter your password!"),
});

const SignInComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (dataInput) => {
    try {
      const result = await axios.post(
        `https://api--elearning.herokuapp.com/auth/login`,
        {
          email: dataInput.email,
          password: dataInput.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", result.data.token);
      console.log(result);

      dispatch({ type: "LOGIN_DATA", payload: result.data.user });
      alert(`Welcome ${result.data.user.full_name} to Elearning!`);

      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
        closable
      />;
      // return (window.location.href = "/");
      return history.push("/");
    } catch (error) {
      return Alert.error(
        // `<div role="alert"> ${error.response.data.message} </div>`,
        `<div role="alert"> Login failed! </div>`,
        {
          html: true,
          position: "top",
          effect: "slide",
        }
      );
    }
  };
  const responseGoogle = async (response) => {
    try {
      const result = await SigninWithGoogle({
        access_token: response.accessToken,
      });
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        dispatch({ type: "LOGIN_DATA", payload: result.data.user });
        return Alert.success(`<div role="alert"> Sign In Successfully </div>`, {
          html: true,
          position: "top-right",
          effect: "slide",
        });
      }
    } catch (error) {
      return Alert.error(
        `<div role="alert">${error.response.data.message}</div>`,
        {
          html: true,
          position: "top-right",
          effect: "slide",
        }
      );
    }
  };
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="signin">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <Button type="link" icon={<LeftOutlined />} size="large" href="/">
              Back
            </Button>
            <figure>
              <img
                src="https://storage.googleapis.com/elearning-305907.appspot.com/images/signin-image.jpg"
                alt="sign in image"
              />
            </figure>
            <a href="/auth/register" className="signup-image-link">
              Create an account
            </a>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email" />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  ref={register}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock" />
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  className="agree-term"
                />
                <label htmlFor="remember-me" className="label-agree-term">
                  <span>
                    <span />
                  </span>
                  Remember me
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  className="form-submit"
                  name="signin"
                  id="signin"
                  type="submit"
                  value="Sign In"
                />
              </div>
            </form>
            <div className="social-login">
              <GoogleLogin
                clientId="998093637270-hhqclmlctiv0cakc2qeduofotciaaetk.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                buttonText="Or Sign In With Google"
              ></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInComponent;
