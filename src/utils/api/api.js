import axios from "axios";

export const getApi = axios.create({
  baseURL: "https://65df98ccff5e305f32a2a067.mockapi.io/api/test/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
