import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import useFirebaseAuth from "./useFirebaseAuth";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { signup, isAuthenticated } = useFirebaseAuth();
  const signupProcess = async (userName, email, password) => {
    try {
      const user_id = await signup(email, password);
      await axios.post(`http://localhost:8080/personal`, {
        user_id,
        name: userName,
        mail_address: email,
      });
    } catch {
      alert("アカウント作成に失敗しました");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Body>
      <Title>アカウント作成</Title>
      <Email>
        ユーザーネーム：
        <input
          value={userName}
          type="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Email>
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
      <SubmitButton onClick={() => signupProcess(userName, email, password)}>
        アカウント作成
      </SubmitButton>
      <HorizontalLine />
      <p>すでにアカウントがある方はこちら</p>
      <Link to="/login">
        <TransitionCreateAccount data-testid="signup-button">
          ログインはこちら
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
const HorizontalLine = styled.hr`
  width: 100%;
`;
const Password = styled.div`
  font-size: 24px;
  margin: 20px;
  input {
    font-size: 24px;
    height: 43px;
    width: 200px;
  }
`;
const SubmitButton = styled.button`
  color: #ff7f50;
  font-size: 24px;
  width: 340px;
  height: 56px;
  background: #faf9f9;
  border: solid 1px #ff7f50;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
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
`;

export default SignUp;
