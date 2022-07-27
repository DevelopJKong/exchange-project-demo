import { useRecoilValue, useRecoilState } from "recoil";
import { loginSuccessState, logOutState } from "../atoms";

const Home = () => {
    const [login, setLogin] = useRecoilState(loginSuccessState);
    const logout = useRecoilValue(logOutState);
    return (
        <>
            <div>{login?.currentUser ? "Welcome" : "Home"}</div>
            <button onClick={() => setLogin(logout)}>LogOut</button>
        </>
    );
};

export default Home;
