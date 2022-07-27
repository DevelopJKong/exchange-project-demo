import { atom } from "recoil";

export const loginSuccessState = atom({
    key: "Login",
    default: JSON.parse(localStorage.getItem("Login") || "{}"),
});

export const loginFailureState = atom({
    key: "Fail",
    default: { currentUser: "", token: "", isFetching: false, error: true, expire: Date.now() },
});

export const logOutState = atom({
    key: "Logout",
    default: { currentUser: "", token: "", isFetching: false, error: false, expire: 0 },
});
