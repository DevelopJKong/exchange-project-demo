import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginFailureState, loginSuccessState } from "../../atoms";
import { userRequest } from "../../requestMethod";

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
      const userData = await userRequest.post(`/users/login`, { ...data });

      if (userData.data.message === "존재하는 계정이 없습니다") {
        throw new Error("user");
      }

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
        case "user":
          setError("userExist", {
            message: "존재하는 계정이 없습니다",
          });
          break;
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
    <main>
      {/*👆 삭제할 예정*/}
      <h2>로그인 페이지</h2>
      {/*👆 삭제할 예정*/}
      <form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
        <input
          placeholder="email"
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "필수값입니다",
            },
            minLength: { value: 5, message: "이메일이 너무 짧습니다" },
          })}
        />
        <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.email?.message}</div>
        <input
          placeholder="password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "필수값입니다",
            },
            minLength: { value: 4, message: "패스워드가 너무 짧습니다" },
          })}
        />
        <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.password?.message}</div>

        <button>로그인</button>
        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/join">Join</Link>
        <br />
        <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.extraError?.message}</div>
        <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.verified?.message}</div>
        <div style={{ color: "red" } /*👈 삭제할 예정*/}>{errors?.userExist?.message}</div>
      </form>
    </main>
  );
};

export default Login;
