import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./Home";
import { DetailsCourse } from "./DetailsCourse";
import { MyAccount } from "./MyAccount";
import { MyLearning } from "./MyLearning";
import { Library } from "./Library";
import { useAuth } from "../hooks/useAuth";
import { Tutor } from "./Tutor";
import { ContentsOfCourse } from "./ContentsOfCourse";
import { ForgotPassword } from "./ForgotPassword";
import { About } from "./About";
import { ContactAndSupport } from "./ContactAndSupport";
import "antd/dist/antd.css";

export const Routers = () => {
  useAuth();
  return (
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
      <Route path="/courses/:courseId" component={DetailsCourse} />
      <Route path="/user/edit" component={MyAccount} />
      <Route path="/tutor/dashboard" component={Tutor} />
      <Route
        path="/tutor/course/contents/:courseId"
        component={ContentsOfCourse}
      />
      <Route path="/course/learn/:courseId" component={MyLearning} />
      <Route path="/user/library" component={Library} />
      <Route path="/auth/forgotPassword" component={ForgotPassword} />
      <Route path="/about" component={About} />
      <Route path="/contactAndSupport" component={ContactAndSupport} />
    </Switch>
  );
};
