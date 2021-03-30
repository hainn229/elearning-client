import React from "react";
import LibraryComponent from "../components/myAccount/library";

export const Library = (props) => {
  const courseId = props.match.params.courseId;
  return <LibraryComponent courseId={courseId}/>;
};
