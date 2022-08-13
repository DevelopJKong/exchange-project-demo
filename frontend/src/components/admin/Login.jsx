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
      setLoginSuccess({
        currentUser: userData.data.email,
        token: userData.data.token,
        isFetching: false,
        error: false,
        expire: Date.now(),
      });
    } catch (error) {
      const {
        response: {
          data: { message, status },
        },
      } = error;
      switch (status) {
        case "userExist":
          setError("userExist", { message });
          break;
        case "wrongPassword":
          setError("wrongPassword", { message });
          break;
        default:
          setError("extraServerError", { message });
          break;
      }
      setLoginFailure(loginFailure);
    }
  };

  return (
    <main>
      <h2>로그인 페이지</h2>
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
        <div>{errors?.email?.message}</div>
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
        <div>{errors?.password?.message}</div>

        <button>로그인</button>
        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/join">Join</Link>
        <br />
        <div>{errors?.extraError?.message}</div>
        <div>{errors?.verified?.message}</div>
        <div>{errors?.userExist?.message}</div>
        <div>{errors?.wrongPassword?.message}</div>
      </form>
    </main>
  );
};

export default Login;
