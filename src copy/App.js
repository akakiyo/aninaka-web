import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import useAuthUser from "./auth/useAuthUser";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "../src/routes/Home";
// import FriendList from "./routes/FriendList";
// import AddFriend from "./routes/AddFriend";

const App = () => {
  const { isAuthenticated } = useAuthUser();
  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/friend-lsit"
            element={
              isAuthenticated ? <FriendList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-friend"
            element={isAuthenticated ? <AddFriend /> : <Navigate to="/login" />}
          /> */}
        </Routes>
      </Layout>
    </>
  );
};
export default App;
