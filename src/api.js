export const API_BASE_URL = "http://localhost:3000";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // change if your Rails server uses another host/port
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;

