import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginSuccessState, logOutState } from "../atoms";

const Home = () => {
  const [login, setLogin] = useRecoilState(loginSuccessState);
  const logout = useRecoilValue(logOutState);
  return (
    <>
      <div>{login?.currentUser ? "Welcome" : "Home"}</div>
      {login?.currentUser ? (
        <button onClick={() => setLogin(logout)}>LogOut</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default Home;
