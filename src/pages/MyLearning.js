import React from "react";
import LearningComponent from "../components/myAccount/learning";

export const MyLearning = (props) => {
  const courseId = props.match.params.courseId;
  return <LearningComponent courseId={courseId} />;
};
