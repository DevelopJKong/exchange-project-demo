import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const emailChecker = async (email) => {
  const res = await userRequest.post("/users/emailCheck", { email });
  return res;
};
