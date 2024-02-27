import axios from "axios";
const BASE_URL = "http://localhost:3000/api/auth";

export default axios.create({
  baseURL: BASE_URL,
});

export const getApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
