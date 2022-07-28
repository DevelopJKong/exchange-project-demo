import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL, emailChecker } from "../apiCall";

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const Error = styled.div``;
const Success = styled.div``;

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();
    const navigator = useNavigate();
    const [isCheck, setIsCheck] = useState(false);
    const onValid = async (data) => {
        const { password, confirmation_password } = data;

        try {
            if (password !== confirmation_password) {
                throw new Error("password");
            }
            const userData = await axios(`${BASE_URL}/users/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data),
            });

            if (userData) {
                navigator("/");
            }
        } catch (error) {
            const { message } = error;
            switch (message) {
                case "password":
                    setError("diffPassword", { message: "비밀번호가 일치하지 않습니다" });
                    break;

                default:
                    setError("extraServerError", { message: "동일한 계정이 있습니다" });
                    break;
            }
        }
    };
    const handleClick = async () => {
        const email = document.getElementById("email");
        try {
            const checkInfo = await emailChecker(email.value);
            setIsCheck(true);
        } catch (error) {
            const { message } = error;
            switch (message) {
                default:
                    setIsCheck(false);
                    setError("checkEmail", { message: "동일한 이메일이 있습니다 다른 이메일을 작성해주세요" });
                    break;
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
            <Input
                placeholder="아이디로 등록할 이메일을 기입하여 주세요"
                type="email"
                id="email"
                {...register("email", {
                    required: {
                        value: true,
                        message: "필수값입니다",
                    },
                    minLength: { value: 5, message: "이메일이 너무 짧습니다" },
                    pattern: {
                        value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "이메일 형식이 아닙니다",
                    },
                })}
            />

            <Button type="button" onClick={handleClick}>
                중복 확인
            </Button>
            
            <Input
                placeholder="비밀번호를 입력하여 주세요."
                type="password"
                {...register("password", {
                    required: {
                        value: true,
                        message: "필수값입니다",
                    },
                    minLength: { value: 5, message: "패스워드가 너무 짧습니다" },
                })}
            />
            <Input
                placeholder="위 비밀번호와 동일하게 입력해주세요."
                type="password"
                {...register("confirmation_password", {
                    required: {
                        value: true,
                        message: "필수값입니다",
                    },
                    minLength: { value: 5, message: "검증 패스워드가 너무 짧습니다" },
                })}
            />
            <Input
                placeholder="한글명"
                type="text"
                {...register("name", {
                    required: {
                        value: true,
                        message: "필수값입니다",
                    },
                    minLength: { value: 2, message: "이름이 너무 짧습니다" },
                })}
            />
            <Input
                placeholder="Username"
                type="text"
                {...register("username", {
                    required: {
                        value: true,
                        message: "필수값입니다",
                    },
                    minLength: { value: 3, message: "닉네임이 너무 짧습니다" },
                })}
            />
            <Button>회원가입</Button>
            <br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Success></Success>
            <Error>{errors?.email?.message}</Error>
            <Error>{errors?.checkEmail?.message}</Error>
            <Error>{errors?.password?.message}</Error>
            <Error>{errors?.confirmation_password?.message}</Error>
            <Error>{errors?.username?.message}</Error>
            <Error>{errors?.name?.message}</Error>
            <Error>{errors?.diffPassword?.message}</Error>
            <Error>{errors?.extraServerError?.message}</Error>
        </Form>
    );
};

export default Register;
