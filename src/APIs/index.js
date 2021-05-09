import axios from "axios";

const jwt = localStorage.getItem("token");

const api = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://elearning-apis.herokuapp.com",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + jwt,
  },
});

const upload = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://elearning-apis.herokuapp.com",
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

export const postSignUp = async (params) => {
  return await api.post(`/auth/register`, params);
};

export const postSignInWithGoogle = async (params) => {
  return await api.post(`/auth/google`, params);
};

export const putUpdateUser = async (params, data) => {
  return await api.put(`/auth/${params}`, data);
};

export const postUpdateAmount = async (params) => {
  return await api.post(`/users/updateAmount`, params);
};

export const postUpdatePassword = async (params) => {
  return await api.post(`/auth/updatePassword`, params);
};

export const postForgotPassword = async (params) => {
  return await api.post(`/auth/forgotPassword`, params);
};

// Categories
export const getAllCategories = async () => {
  return await api.get(`/categories/all`);
};

// Courses
export const getCourses = async (pagination) => {
  return await api.get(`/courses?${pagination}`);
};
export const getCoursesActive = async (params) => {
  return await api.get(`/courses/active?${params}`);
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
  return await api.post(`/courses/recent/add`, params);
};
export const postAddCourse = async (params) => {
  return await api.post(`/courses/add`, params);
};
export const getDetailsCourse = async (params) => {
  return await api.get(`/courses/${params}`);
};

// Contents
export const getCourseWithContents = async (params)=> {
  return await api.get(`/contents/${params}`); // contents/:course_id
};
export const postAddContent = async (params)=> {
  return await api.post(`/contents/add`, params);
};
export const getContent = async (params)=> {
  return await api.get(`/contents/${params}`); // contents/:_id
};

// Wishlists
export const getWishlist = async (params) => {
  return await api.get(`/wishlists/${params}`); // wishlists/:user_id
};
export const postAddToWishlist = async (params) => {
  return await api.post(`/wishlists/add`, params);
};

export const deleteWishlist = async (params) => {
  return await api.delete(`/wishlishs/${params}`);
};

// Comments
export const getComments = async (params, pagination) => {
  return await api.get(`/comments/${params}?${pagination}`); // comments/:course_id
};
export const postAddComment = async function (params) {
  return await api.post(`/comments/add`, params);
};

export const deleteComment = async (params) => {
  return await api.delete(`/comments/${params}`);
};
export const putUpdateComment = async (commentId, data) => {
  return await api.put(`/comments/${commentId}`, data);
};

// Orders
export const getOrders = async (params) => {
  return await api.get(`/orders/${params}`);
};
export const putUpdateOrder = async (params) => {
  return await api.put(`/orders/${params}`);
};
export const postAddOrder = async (params) => {
  return await api.post(`/orders/add`, params);
};
export const deleteOrder = async (params) => {
  return await api.delete(`/orders/${params}`);
};

export const getOrdersLibrary = async (params, pagination) => {
  return await api.get(`/orders/library/${params}?${pagination}`);
};

// Upload File
export const uploadImage = async (params) => {
  return await upload.post(`/upload/images`, params);
};
export const uploadVideo = async (params) => {
  return await upload.post(`/upload/videos`, params);
};
