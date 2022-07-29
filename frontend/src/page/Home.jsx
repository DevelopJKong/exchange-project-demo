import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginSuccessState, logOutState } from "../atoms";

const Home = () => {
  const [login, setLogin] = useRecoilState(loginSuccessState);
  const logout = useRecoilValue(logOutState);
  return (
    <main>
      <h2>Exchange Project</h2>
      <div><p>{login?.currentUser ? "Welcome" : "Home"}</p></div>
      {login?.currentUser ? (
        <Link onClick={() => setLogin(logout)} to="#">LogOut</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </main>
  );
};

export default Home;
