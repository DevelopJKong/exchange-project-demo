import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginSuccessState } from "./atoms";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";

const Router = () => {
    const login = useRecoilValue(loginSuccessState);
    // localStorage.setItem("Login", JSON.stringify(login));

    // if (login && new Date(login.expire).getMinutes() !== new Date(Date.now()).getMinutes()) {
    //     localStorage.clear();
    // }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={login?.currentUser ? <Navigate to="/" /> : <Login />} />
                <Route path="/join" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
