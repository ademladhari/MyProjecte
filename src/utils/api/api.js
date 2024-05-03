import axios from "axios";

export const getApi = axios.create({
  baseURL: "http://192.168.0.4:3000/api/",
  headers: { "Content-Type": "application/json", "x-api-key": "1111" },

  withCredentials: true,
});
export const getApiAuth = axios.create({
  baseURL: "http://192.168.0.4:3000/api/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
