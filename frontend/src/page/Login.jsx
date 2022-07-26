import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from "../redux/apiCall";
import { useState } from "react";

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
    const onValid = async (data) => {
        const { email, password } = data;

        try {
            const userData = await axios(`http://localhost:5000/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email,
                    password,
                },
            });

            if (userData.message === "이메일이나 비밀번호가 틀렸습니다") {
                throw Error;
            }
            console.log("register 확인하기", { ...register("email"), ...register("password") });
        } catch (error) {
            setError("extraError", { message: "이메일이나 비밀번호가 틀렸습니다🧡" });
        }
    };

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Input
                placeholder="email"
                type="email"
                {...register("email", {
                    required: true,
                    minLength: { value: 5, message: "이메일이 너무 짧습니다" },
                })}
            />
            <Input
                placehodler="password"
                type="password"
                {...register("password", {
                    required: true,
                    minLength: { value: 3, message: "패스워드가 너무 짧습니다" },
                })}
            />
            <Button>LOGIN</Button>
            <Error>{errors?.email?.message}</Error>
            <Error>{errors?.password?.message}</Error>
            <Error>{errors?.extraError?.message}</Error>
        </Form>
    );
};

export default Login;
