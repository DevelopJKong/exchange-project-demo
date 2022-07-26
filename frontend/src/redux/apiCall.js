import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // const res = await publicRequest.post("/auth/login", user);
    const baseUrl = "http://localhost:5000/api";
    const data =
      await axios.post(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
            user
        }
      })
    
    console.log(data);
    dispatch(loginSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};