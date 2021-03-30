import React from "react";
import DetailsCourseComponent from "../components/courses/details";

export const DetailsCourse = (props) => {
  const courseId = props.match.params.courseId;
  return <DetailsCourseComponent courseId={courseId} />;
};
