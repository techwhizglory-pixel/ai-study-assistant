// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


// // AUTH API
// export const registerUser = (data) =>
//   API.post("/auth/register", data);

// export const loginUser = (data) =>
//   API.post("/auth/login", data);

// export const getCurrentUser = () =>
//   API.get("/auth/me");

// export default API;