import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const data = await axios(`http://localhost:5000/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
                email: user.email,
                password: user.password,
            },
        });
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFailure());
    }
};
