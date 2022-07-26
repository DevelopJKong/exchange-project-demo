import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userRedux";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.currentUser);
  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(logOut());
  };
  return (
    <>
      <div>{user ? "Welcome" : "Home"}</div>
      <button onClick={handleLogOut}>LogOut</button>
    </>
  );
};

export default Home;
