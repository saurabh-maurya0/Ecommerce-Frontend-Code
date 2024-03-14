import { privateAxios, publicAxio } from "./AxiosService";

//register user api call
export const registerUser = (userData) => {
  return publicAxio.post(`/users`, userData).then((response) => response.data);
};

//login user api call
export const loginUser = (loginData) => {
  return publicAxio
    .post(`/auth/login`, loginData)
    .then((response) => response.data);
};

//get user by userId
export const getUser = (userId) => {
  return publicAxio.get(`/users/${userId}`).then((response) => response.data);
};

//update user

export const updateUser = (user) => {
  return privateAxios
    .put(`/users/${user.userId}`, user)
    .then((response) => response.data);
};

//update user profile picture

export const updateUserProfilePicture = (file, userId) => {
  if (file === null) {
    return;
  }
  const data = new FormData();
  data.append("userImage", file);
  return privateAxios
    .post(`/users/image/${userId}`, data)
    .then((response) => response.data);
};

// get all users

export const getAllUsers = (pageNumber, pageSize, sortBy, sortDir) => {
  return privateAxios
    .get(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((res) => res.data);
};

// search User service

export const searchUser = (query) => {
  return privateAxios.get(`/users/search/${query}`).then((res) => res.data);
};
