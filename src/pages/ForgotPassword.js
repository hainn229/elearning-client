import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ForgotPasswordComponent from "../components/myAccount/forgotPassword";
import { useAuth } from "../hooks/useAuth";

export const ForgotPassword = () => {
  const request = useAuth();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  if (!request.error) {
    return <Redirect to={`/user/edit`} />;
  }
  if (user) {
    return <Redirect to={`/user/edit`} />;
  }
  return <ForgotPasswordComponent />;
};
