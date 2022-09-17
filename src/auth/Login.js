import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import useFirebaseAuth from "./useFirebaseAuth";
import { TransitionOtherButton, DoneButton } from "./Buttons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useFirebaseAuth();
  const isInvalid = password === "" || email === "";

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
      <Title>ログイン</Title>
      <Email>
        Email：
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Email>
      <Password>
        Password：
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Password>
      <DoneButton
        disabled={isInvalid}
        type="submit"
        onClick={() => login(email, password)}
      >
        ログイン
      </DoneButton>
      <HorizontalLine />
      <p>アカウントがない方はこちら</p>
      <Link to="/signup">
        <TransitionOtherButton>アカウント作成はこちら</TransitionOtherButton>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const Email = styled.div`
  margin: 40px 0 0 60px;
  font-size: 24px;
  input {
    height: 43px;
    width: 200px;
    font-size: 24px;
  }
`;
const Password = styled.div`
  margin: 20px;
  font-size: 24px;
  input {
    height: 43px;
    width: 193px;
    font-size: 24px;
  }
`;
const HorizontalLine = styled.hr`
  width: 100%;
`;

export default Login;
