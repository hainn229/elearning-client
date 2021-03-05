import axios from "axios";
const jwt = localStorage.getItem("token");
const instance = axios.create({
  baseUrl: `http://localhost:5000`,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + jwt,
  },
});

const upload = axios.create({
  baseUrl: `http://localhost:5000`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const api = axios.create({
  baseUrl: `http://localhost:5000`,
  headers: {
    "Content-Type": "application/json",
  },
});
// Auth
export const Login = async function (params) {
  return await api.post("/auth/login", params);
};
export const Register = async function (params) {
  return await instance.post("/auth/register", params);
};
export const getMyAccount = async function () {
  return await instance.get("/auth/myAccount");
};
export const SigninWithGoogle = async function (params) {
  const apiSign = axios.create({
    baseUrl: `http://localhost:5000`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  return await apiSign.post("/auth/google", params);
};

// Categories
export const getCategories = async function () {
  return await instance.get("/categories/all");
};

// Courses
export const getCourses = async function () {
  return await instance.get("/courses/");
};
export const postAddCourse = async function (params) {
  return await instance.post("/courses/add", params);
};
export const getCourse = async function (params) {
  return await instance.get(`/courses/${params}`);
};

// Contents
export const getCourseWithContents = async function (params) {
  return await instance.get(`/contents/${params}`); // contents/:course_id
};
export const postAddContent = async function (params) {
  return await instance.get(`/contents/add`, params);
};
export const getContent = async function (params) {
  return await instance.get(`/contents/${params}`); // contents/:_id
};

// Libraries
export const getLibrary = async function (params, pagination) {
  return await instance.get(`/libraries/${params}?${pagination}`); // libraries/:user_id
};
export const postAddCourseToLibrary = async function (params) {
  return await instance.get(`/libraries/add`, params);
};

// Wishlists
export const getWishlist = async function (params, pagination) {
  return await instance.get(`/wishlists/${params}`); // wishlists/:user_id
};
export const postAddCourseToWishlist = async function (params) {
  return await instance.get(`/wishlists/add`, params);
};

// Comments
export const getComments = async function (params, pagination) {
  return await instance.get(`/comments/${params}?${pagination}`); // comments/:course_id
};
export const postAddComment = async function (params) {
  return await instance.post("/comments/add", params);
};

// Upload File
export const uploadImages = async function (params) {
  return await upload.post("/upload/images", params);
};
export const uploadVideos = async function (params) {
  return await upload.post("/upload/videos", params);
};
