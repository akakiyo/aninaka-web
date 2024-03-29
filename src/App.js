import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import useAuthUser from "./auth/useAuthUser";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Top from "./routes/Top/Top";
// import FriendList from "./routes/FriendList";
// import AddFriend from "./routes/AddFriend";

const App = () => {
  const { isAuthenticated } = useAuthUser();
  console.log(isAuthenticated);
  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={isAuthenticated ? <Top /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </>
  );
};
export default App;
