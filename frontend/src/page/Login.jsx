import styled from "styled-components";
import { login } from "../redux/apiCall";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const Error = styled.div``;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, error } = useSelector((state) => state.user);
    const handleClick = (event) => {
        event.preventDefault();
        login(dispatch, { email, password });
    };
    useEffect(() => {
        if (localStorage.getItem("persist:root")) {
            const storageData = JSON.parse(localStorage.getItem("persist:root"));
            const currentInfo = JSON.parse(storageData?.user);
            if (currentInfo?.currentUser?.data) {
                navigate("/");
            }
        }
    }, []);

    return (
        <Form>
            <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleClick} disabled={isFetching}>
                LOGIN
            </Button>
            {error && <Error>Something is wrong...</Error>}
            <Link to={`/`}>DO NOT YOU REMEMBER THE PASSWORD?</Link>
            <Link to={`/login`}>CREATE A NEW ACCOUNT</Link>
        </Form>
    );
};

export default Login;
