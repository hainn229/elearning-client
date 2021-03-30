import React from "react";
import ContentsOfCourseComponent from "../components/tutor/contents";

export const ContentsOfCourse = (props) => {
  const courseId = props.match.params.courseId;
  return <ContentsOfCourseComponent courseId={courseId} />;
};
