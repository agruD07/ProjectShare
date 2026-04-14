// import axios from "axios";
// const instance = axios.create({
//     baseURL: "http://localhost:8080",
//     headers: {
//         'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
//     }
// })

// export default instance

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ Add interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;