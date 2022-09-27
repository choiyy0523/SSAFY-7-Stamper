import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://j7206.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const createHeaders = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export { instance, createHeaders };
