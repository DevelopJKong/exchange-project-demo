
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../redux/userRedux";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.currentUser);
  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(logOutSuccess());
  };

  return (
    <>
      <div>{user ? "Welcome" : "Home"}</div>
      <button onClick={handleLogOut}>LogOut</button>
    </>
  );

};

export default Home;
