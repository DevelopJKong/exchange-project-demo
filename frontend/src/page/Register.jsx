import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { emailChecker, userRequest } from "../requestMethod";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm();
  const navigator = useNavigate();
  const [emailCheck, setEmailCheck] = useState("");
  const buttonRef = useRef(null);
  const conPasswordRef = useRef(null);

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

  useEffect(() => {
    buttonRef.current.click();
  }, []);
  console.log(getValues("password"));
  console.log(getValues("confirmation_password"));
  console.log(getValues("password") === getValues("confirmation_password"))

  return (
    <main>
      {/*👆 삭제할 예정*/}
      <h2>회원가입 페이지</h2>
      {/*👆 삭제할 예정*/}
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
            style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="아이디로 등록할 이메일을 기입하여 주세요"
            type="email"
            id="email"
            {...register("email", {
              required: true,
              minLength: 5,
              pattern: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            })}
            onChange={() => setEmailCheck("")}
          />

          <button type="button" onClick={handleClick}>
            중복 확인
          </button>

          {/*이메일 관련 에러 모음*/}
          <div style={{ color: "green" } /*👈 삭제할 예정*/}>{emailCheck}</div>
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.notEmail?.message}</div>
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.checkEmail?.message}</div>
        </div>
        <div>
          <label htmlFor="password">비밀번호: </label>
          <input
             style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="비밀번호를 입력하여 주세요."
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: { value: 5, message: "패스워드가 너무 짧습니다" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                message: "대문자,소문자,특수문자를 포함해주세요",
              }
            })}
          />
          {/*비밀번호 관련 에러 모음*/}
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.password?.message}</div>
        </div>
        <div>
          <label htmlFor="confirmation_password">비밀번호 확인: </label>
          <input
            style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="위 비밀번호와 동일하게 입력해주세요."
            type="password"
            id="confirmation_password"
            ref={conPasswordRef}
            {...register("confirmation_password", {
              required: true,
              minLength: { value: 5, message: "검증 패스워드가 너무 짧습니다" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                message: "대문자,소문자,특수문자를 포함해주세요",
              },
            })}
          />
          {/*비밀번호 확인 관련 에러 모음*/}
          <div style={{ color: "green" } /*👈 삭제할 예정*/}>{getValues("password") === getValues("confirmation_password") && getValues("password") !== "" ? "비밀번호가 일치합니다": ""}</div>
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.confirmation_password?.message}</div>
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.diffPassword?.message}</div>
        </div>

        <div>
          <label htmlFor="name">한글명: </label>
          <input
            style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="한글명"
            type="text"
            id="name"
            {...register("name", {
              required: true,
              pattern: {
                value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
                message: "한글 형식이 아닙니다",
              },
            })}
          />
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.name?.message}</div>
        </div>
        <div>
          <label htmlFor="lastName">영문명: </label>
          <input
             style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="영문명[성]"
            type="text"
            id="lastName"
            {...register("lastName", {
              required: true,
              pattern: {
                value: /^[a-zA-Z]*$/,
                message: "영어 형식이 아닙니다",
              },
            })}
          />
          <input
           style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="영문명[이름]"
            type="text"
            {...register("firstName", {
              required: true,
              pattern: {
                value: /^[a-zA-Z]*$/,
                message: "영어 형식이 아닙니다",
              },
            })}
          />
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.lastName?.message}</div>
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.firstName?.message}</div>
        </div>

        <div>
          <label htmlFor="birthNumber">생년월일: </label>
          <input
            style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="생년월일 8자리 (YYYYMMDD)"
            type="text"
            id="birthNumber"
            {...register("birthNumber", {
              required: true,
              minLength: { value: 7, message: "생년월일 8자리를 입력해주세요" },
            })}
          />
          <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.birthNumber?.message}</div>
        </div>
        <div>
          <label>추천 코드: </label>
          <input
            style={{ width: "50%" } /*👈 삭제할 예정*/}
            placeholder="(선택사항)추천 코드를 입력해주세요"
            type="text"
            id="recommendCode"
            {...register("recommendCode")}
          />
        </div>
        <button ref={buttonRef}>회원가입</button>
        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />

        <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.extraServerError?.message}</div>
      </form>
    </main>
  );
};

export default Register;
