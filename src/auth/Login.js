import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import useAuthUser from "./useAuthUser";
import { TransitionOtherButton, DoneButton } from "./Buttons";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const { login, isAuthenticated } = useAuthUser();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
      <Title>ログイン</Title>
      <Email>
        Email：
        <input
          value={emailAddress}
          type="email"
          onChange={(e) => setEmailAddress(e.target.value)}
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
        onClick={() => login(emailAddress, password)}
        disabled={isInvalid}
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
