import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./Home";
import { SignInPage } from "./SignIn";
import { SignUpPage } from "./SignUp";
import "antd/dist/antd.css";
export const Routers = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
      <Route path="/auth/login" component={SignInPage} />
      <Route path="/auth/register" component={SignUpPage} />
    </Switch>
  );
};
