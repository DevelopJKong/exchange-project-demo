import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginFailureState, loginSuccessState } from "../atoms";
import axios from "axios";

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const ErrorInfo = styled.div``;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const setLoginSuccess = useSetRecoilState(loginSuccessState);
  const [loginFailure, setLoginFailure] = useRecoilState(loginFailureState);

  const onValid = async (data) => {
    try {
      const userData = await axios(`http://localhost:5000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      if (!userData.data.verified) {
        throw new Error("email");
      }

      setLoginSuccess({
        currentUser: userData.data.email,
        token: userData.data.token,
        isFetching: false,
        error: false,
        expire: Date.now(),
      });
    } catch (error) {
      const { message } = error;
      switch (message) {
        case "email":
          setError("verified", {
            message: "이메일을 인증해주세요",
          });
          break;

        default:
          setError("extraError", {
            message: "이메일이나 비밀번호가 틀렸습니다",
          });
          break;
      }
      setLoginFailure(loginFailure);

    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
      <Input
        placeholder="email"
        type="text"
        {...register("email", {
          required: {
            value: true,
            message: "필수값입니다",
          },
          minLength: { value: 5, message: "Your email is too short" },
        })}
      />
      <Input
        placeholder="password"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "필수값입니다",
          },
          minLength: { value: 4, message: "Your password is too short" },
        })}
      />
      <Button>LOGIN</Button>
      <br />
      <Link to="/">Home</Link>
      <br />
      <Link to="/join">Join</Link>
      <br />
      <ErrorInfo>{errors?.username?.message}</ErrorInfo>
      <ErrorInfo>{errors?.password?.message}</ErrorInfo>
      <ErrorInfo>{errors?.extraError?.message}</ErrorInfo>
      <ErrorInfo>{errors?.verified?.message}</ErrorInfo>
    </Form>
  );
};

export default Login;
