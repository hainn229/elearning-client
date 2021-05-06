import axios from "axios";

const jwt = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + jwt,
  },
});

const upload = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "content-type": "multipart/form-data",
  },
});

// Auth
export const getMyAccount = async () => {
  return await api.get(`/auth/myAccount`);
};

export const postSignIn = async (params) => {
  return await api.post(`/auth/login`, params);
};

export const postRegister = async (params) => {
  return await api.post(`/auth/register`, params);
};

export const postSignInWithGoogle = async (params) => {
  return await api.post(`/auth/google`, params);
};

export const putUpdateUser = async (params) => {
  return await api.put(`/auth/${params}`);
};

export const postUpdateAmount = async (params) => {
  return await api.post(`/users/updateAmount`, params);
};

// Categories
export const getAllCategories = async () => {
  return await api.get(`/categories/all`);
};

// Courses
export const getCourses = async () => {
  return await api.get(`/courses/`);
};
export const getCoursesActive = async () => {
  return await api.get(`/courses/active`);
};
export const getCoursesPending = async () => {
  return await api.get(`/courses/pending`);
};
export const getCoursesPopular = async () => {
  return await api.get(`/courses/popular`);
};
export const getCoursesRecent = async (params) => {
  return await api.get(`/courses/recent/${params}`);
};
export const postAddCourseRecent = async (params) => {
  return await api.get(`/courses/recent/add`, params);
};
export const postAddCourse = async (params) => {
  return await api.post(`/courses/add`, params);
};
export const getDetailsCourse = async (params) => {
  return await api.get(`/courses/${params}`);
};

// Contents
export const getCourseWithContents = async function (params) {
  return await api.get(`/contents/${params}`); // contents/:course_id
};
export const postAddContent = async function (params) {
  return await api.get(`/contents/add`, params);
};
export const getContent = async function (params) {
  return await api.get(`/contents/${params}`); // contents/:_id
};

// Wishlists
export const getWishlist = async function (params, pagination) {
  return await api.get(`/wishlists/${params}?${pagination}`); // wishlists/:user_id
};
export const postAddToWishlist = async (params) => {
  return await api.get(`/wishlists/add`, params);
};

// Comments
export const getComments = async function (params, pagination) {
  return await api.get(`/comments/${params}?${pagination}`); // comments/:course_id
};
export const postAddComment = async function (params) {
  return await api.post(`/comments/add`, params);
};

// Orders
export const getOrders = async (params, pagination) => {
  return await api.get(`/orders/${params}?${pagination}`);
};
export const putUpdateOrder = async (params) => {
  return await api.put(`/orders/${params}`);
};
export const postAddOrder = async (params) => {
  return await api.post(`/orders/add`, params);
};

// Upload File
export const uploadImages = async function (params) {
  return await upload.post(`/upload/images`, params);
};
export const uploadVideos = async function (params) {
  return await upload.post(`/upload/videos`, params);
};
