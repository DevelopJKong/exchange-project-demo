import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginFailureState, loginSuccessState } from "../atoms";
import axios from "axios";

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
};

export default Login;
