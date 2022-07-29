import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { emailChecker, userRequest } from "../requestMethod";

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();
    const navigator = useNavigate();
    const [emailCheck, setEmailCheck] = useState("");
    const onValid = async (data) => {
        const { password, confirmation_password } = data;
        try {
            if (password !== confirmation_password) {
                throw new Error("password");
            }
            const userData = await userRequest.post(`/users/join`, { ...data });
            console.log(userData);
            if (userData) {
                navigator("/");
            }
        } catch (error) {
            const { message } = error;
            console.log(error);
            switch (message) {
                case "password":
                    setError("diffPassword", { message: "비밀번호가 일치하지 않습니다" });
                    break;
                // case "Request failed with status code 400":
                //   setError("userExist", { message: "동일한 닉네임이 있습니다" });
                //   break;
                default:
                    setError("extraServerError", {
                        message: "잠시후에 다시 시도해주세요",
                    });
                    break;
            }
        }
    };

    const handleClick = async () => {
        const email = document.getElementById("email");
        try {
            const checkInfo = await emailChecker(email.value);
            if (checkInfo.data.message === "이메일 형식이 아닙니다") {
                throw new Error("notEmail");
            }
            setEmailCheck(checkInfo.data.message);
            clearErrors();
        } catch (error) {
            const { message } = error;
            switch (message) {
                case "notEmail":
                    setError("notEmail", { message: "이메일 형식이 아닙니다" });
                    break;
                default:
                    setEmailCheck("");
                    setError("checkEmail", {
                        message: "동일한 이메일이 있습니다 다른 이메일을 작성해주세요",
                    });
                    break;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
            <div>
                <select {...register("country")}>
                    <option value="kr">한국</option>
                    <option value="jp">일본</option>
                </select>
            </div>
            <div>
                <label htmlFor="email">이메일: </label>
                <input
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

                <button type="button" onClick={handleClick}>
                    중복 확인
                </button>

                {/*이메일 관련 에러 모음*/}
                <div>{emailCheck}</div>
                <div>{errors?.notEmail?.message}</div>
                <div>{errors?.checkEmail?.message}</div>
                <div>{errors?.email?.message}</div>
            </div>
            <div>
                <label htmlFor="password">비밀번호: </label>
                <input
                    placeholder="비밀번호를 입력하여 주세요."
                    type="password"
                    id="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "필수값입니다",
                        },
                        minLength: { value: 5, message: "패스워드가 너무 짧습니다" },
                    })}
                />
                {/*비밀번호 관련 에러 모음*/}
                <div>{errors?.password?.message}</div>
            </div>
            <div>
                <label htmlFor="confirmation_password">비밀번호 확인: </label>
                <input
                    placeholder="위 비밀번호와 동일하게 입력해주세요."
                    type="password"
                    id="confirmation_password"
                    {...register("confirmation_password", {
                        required: {
                            value: true,
                            message: "필수값입니다",
                        },
                        minLength: { value: 5, message: "검증 패스워드가 너무 짧습니다" },
                    })}
                />
                {/*비밀번호 확인 관련 에러 모음*/}
                <div>{errors?.confirmation_password?.message}</div>
                <div>{errors?.diffPassword?.message}</div>
            </div>

            <div>
                <label htmlFor="name">한글명: </label>
                <input
                    placeholder="한글명"
                    type="text"
                    id="name"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "필수값입니다",
                        },
                        minLength: { value: 2, message: "이름이 너무 짧습니다" },
                    })}
                />
                <div>{errors?.name?.message}</div>
            </div>
            <div>
                <label htmlFor="lastName">영문명: </label>
                <input
                    placeholder="영문명[성]"
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                        required: {
                            value: true,
                            message: "필수값입니다",
                        },
                    })}
                />
                <input
                    placeholder="영문명[이름]"
                    type="text"
                    {...register("firstName", {
                        required: {
                            value: true,
                            message: "필수값입니다",
                        },
                    })}
                />
                <div>{errors?.lastName?.message}</div>
                <div>{errors?.firstName?.message}</div>
            </div>

            <div>
                <label htmlFor="birthNumber">생년월일: </label>
                <input
                    placeholder="생년월일 8자리 (YYYYMMDD)"
                    type="text"
                    id="birthNumber"
                    {...register("birthNumber", {
                        required: {
                            value: true,
                            message: "필수값입니다",
                        },
                        minLength: { value: 7, message: "8자리를 입력해주세요" },
                    })}
                />
            </div>
            <div>
                <label>추천 코드: </label>
                <input placeholder="(선택사항)추천 코드를 입력해주세요" type="text" id="recommendCode" {...register("recommendCode")} />
            </div>
            <button>회원가입</button>
            <br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />

            <div>{errors?.extraServerError?.message}</div>
        </form>
    );
};

export default Register;
