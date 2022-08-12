import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginSuccessState } from "./atoms";
import Content from "./page/Content";
import Main from "./components/Main";
import Login from "./components/admin/Login";
import Register from "./components/admin/Register";
const Router = () => {
    const login = useRecoilValue(loginSuccessState);
    localStorage.setItem("Login", JSON.stringify(login));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Content />}>
                    <Route index element={<Main />} />
                    <Route path="/login" element={login?.currentUser ? <Navigate to="/" /> : <Login />} />
                    <Route path="/join" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
