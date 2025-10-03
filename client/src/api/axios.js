import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// token har request ke header me bhejna
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
