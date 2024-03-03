import axios from "axios";

export const getApi = axios.create({
  baseURL: "https://65df98ccff5e305f32a2a067.mockapi.io/api/test/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const getApiAuth = axios.create({
  baseURL: "http://192.168.0.4:3000/api/auth/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
