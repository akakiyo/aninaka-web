import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import useFirebaseAuth from "./auth/useFirebaseAuth";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./routes/Home";
import FriendList from "./routes/FriendList";
import AddFriend from "./routes/AddFriend";

const App = () => {
  const { isAuthenticated, isLoading } = useFirebaseAuth();

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/friend-lsit"
            element={
              isAuthenticated ? <FriendList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-friend"
            element={isAuthenticated ? <AddFriend /> : <Navigate to="/login" />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </>
  );
};
export default App;
