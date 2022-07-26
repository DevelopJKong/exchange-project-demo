import styled from "styled-components";
import { login } from "../redux/apiCall";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { publicRequest } from "../requestMethods";

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const Error = styled.div``;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onValid = async (data) => {
    const { email, password } = data;
    try {
      const userData = await publicRequest.post("/users/login", {
        email,
        password,
      });

      if (userData) {
        return login(dispatch, {
          email,
          password,
        });
      }
    } catch (error) {
      setError("extraError", { message: "이메일이나 비밀번호가 다릅니다" });
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
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
      <Error>{errors?.username?.message}</Error>
      <Error>{errors?.password?.message}</Error>
      <Error>{errors?.extraError?.message}</Error>
    </Form>
  );
};

export default Login;
