import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";

const Router = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (localStorage.getItem("persist:root")) {
            const storageData = JSON.parse(localStorage.getItem("persist:root"));
            const currentInfo = JSON.parse(storageData?.user);
            const userInfo = currentInfo?.currentUser?.data;
            setUser(userInfo);
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={user?.email ? <Navigate to="/" /> : <Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
