import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const emailChecker = async (email) => {
    try {
        const res = await publicRequest.post("/users/emailCheck", { email });
        return res;
    } catch (error) {
        console.log(error);
    }
};
