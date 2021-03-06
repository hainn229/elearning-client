import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./Home";
import "antd/dist/antd.css";
export const Routers = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
    </Switch>
  );
};
