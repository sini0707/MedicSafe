// import axios from 'axios';
// // import Cookies from 'js-cookie';

// // Create Axios instances
// export const usersApi = axios.create({
//   baseURL: 'http://localhost:5173/api/v1/users',
// });

// export const adminApi = axios.create({
//   baseURL: 'http://localhost:5173/api/v1/admin',
// });

// export const doctorApi = axios.create({
//   baseURL: 'http://localhost:5173/api/v1/doctors',
// });

// // // Define a function to handle token expiration and redirection
// // const handleTokenExpiration = (instance, tokenKey, redirectPath) => {
// //   instance.interceptors.response.use(
// //     (response) => {
// //       return response;
// //     },
// //     (error) => {
// //       if (error?.response?.status === 401 && error?.response?.data?.message === 'jwt expired') {
// //         Cookies.remove(tokenKey);
// //         window.location.replace(redirectPath);
// //       }
// //       return Promise.reject(error);
// //     }
// //   );
// // };

// // // Set up interceptors for each instance
// // handleTokenExpiration(usersApi, 'jwt', '/users');
// // handleTokenExpiration(adminApi, 'admnjwt', '/admin');
// // handleTokenExpiration(doctorApi, 'docjwt', '/doctors');

import axios from "axios";
const apiInstance = axios.create({
  baseURL: "http://localhost:5173",
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;



