import styled from "styled-components";
import { login } from "../redux/apiCall";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const Error = styled.div``;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (event) => {
    event.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <Form>
      <Input
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleClick} disabled={isFetching}>
        LOGIN
      </Button>
      {error && <Error>이메일이나 패스워드가 잘 못 되었습니다</Error>}
      <br />
      <Link to={`/`}>DO NOT YOU REMEMBER THE PASSWORD?</Link>
      <br />
      <Link to={`/login`}>CREATE A NEW ACCOUNT</Link>
    </Form>
  );
};

export default Login;
