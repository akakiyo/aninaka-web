import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./components/Layout";
import useFirebaseAuth from "./auth/useFirebaseAuth";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const App = () => {
  const { isAuthenticated, isLoading, currentUser } = useFirebaseAuth();
  if (isLoading) return <p>loading...</p>;
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </>
  );
};
export default App;
