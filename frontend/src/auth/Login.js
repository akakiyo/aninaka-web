import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import useFirebaseAuth from "./useFirebaseAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useFirebaseAuth();
  const isInvalid = password === "" || email === "";
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Body>
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
      <LoginButton
        disabled={isInvalid}
        type="submit"
        onClick={() => login(email, password)}
      >
        ログイン
      </LoginButton>
      <HorizontalLine />
      <p>アカウントがない方はこちら</p>
      <Link to="/signup">
        <TransitionCreateAccount data-testid="signup-button">
          アカウント作成はこちら
        </TransitionCreateAccount>
      </Link>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
`;
const Email = styled.div`
  font-size: 24px;
  margin: 40px 0 0 60px;
  input {
    font-size: 24px;
    height: 43px;
    width: 200px;
  }
`;
const Password = styled.div`
  font-size: 24px;
  margin: 20px;
  input {
    font-size: 24px;
    height: 43px;
    width: 193px;
  }
`;
const LoginButton = styled.button`
  color: #ff7f50;
  font-size: 24px;
  width: 340px;
  height: 56px;
  background: #faf9f9;
  border: solid 1px #ff7f50;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  margin: 32px;
`;
const HorizontalLine = styled.hr`
  width: 100%;
`;
const TransitionCreateAccount = styled.button`
  color: #faf9f9;
  font-size: 24px;
  width: 340px;
  height: 56px;
  background: #ff7f50;
  border: solid 1px #ff7f50;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  :active {
    border: solid 1px #03a9f4;
    box-shadow: none;
    text-shadow: none;
  }
`;

export default Login;
