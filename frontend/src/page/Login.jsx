import styled from "styled-components";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginFailureState, loginSuccessState } from "../atoms";
import axios from "axios";
=======
import { login } from "../redux/apiCall";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { publicRequest } from "../requestMethods";
>>>>>>> 0cfff7fa62ea90d9cdb0be1f7115f1ce6e296f53

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const Error = styled.div``;

const Login = () => {
<<<<<<< HEAD
    const {
        register,
        handleSubmit,
        setError,
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

            if (userData.message === "이메일이나 비밀번호가 틀렸습니다") {
                throw Error;
            }

            return setLoginSuccess({
                currentUser: userData.data.email,
                token: userData.data.token,
                isFetching: false,
                error: false,
                expire: Date.now(),
            });
        } catch (error) {
            setError("extraError", { message: "이메일이나 비밀번호가 틀렸습니다" });
            return setLoginFailure(loginFailure);
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
=======
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
>>>>>>> 0cfff7fa62ea90d9cdb0be1f7115f1ce6e296f53
};

export default Login;
