import axios from "axios";
export const API_BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://capstone-backend-v1.onrender.com"

const api = axios.create({
  baseURL: API_BASE_URL // change if your Rails server uses another host/port
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;

