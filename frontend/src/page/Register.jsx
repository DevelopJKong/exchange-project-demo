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
      setEmailCheck(checkInfo.data.message);
    } catch (error) {
      const { message } = error;
      switch (message) {
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

      <input
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

      <input
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
      <input
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
      <input
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
      <button>회원가입</button>
      <br />
      <Link to="/">Home</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <div>{emailCheck}</div>
      <div>{errors?.email?.message}</div>
      <div>{errors?.checkEmail?.message}</div>
      <div>{errors?.password?.message}</div>
      <div>{errors?.confirmation_password?.message}</div>
      <div>{errors?.username?.message}</div>
      <div>{errors?.name?.message}</div>
      <div>{errors?.diffPassword?.message}</div>
      <div>{errors?.extraServerError?.message}</div>
    </form>
  );
};

export default Register;
