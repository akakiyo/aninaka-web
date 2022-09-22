import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import useAuthUser from "./useAuthUser";
import { TransitionOtherButton, DoneButton } from "./Buttons";

const SignUp = () => {
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { signup, isAuthenticated } = useAuthUser();

  // const signUp = async (userName, email, password) => {
  //   try {
  //     const user_id = await signup(email, password);
  //   } catch {
  //     alert("アカウント作成に失敗しました");
  //   }
  // };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Wrapper>
      <Title>アカウント作成</Title>
      <UserName>
        ユーザーネーム：
        <input
          value={userName}
          type="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
      </UserName>
      <Email>
        Email：
        <input
          value={email_address}
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
      <DoneButton onClick={() => signup(userName, email_address, password)}>
        アカウント作成
      </DoneButton>
      <HorizontalLine />
      <p>すでにアカウントがある方はこちら</p>
      <Link to="/login">
        <TransitionOtherButton>ログインはこちら</TransitionOtherButton>
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
const UserName = styled.div`
  margin: 40px 0 0 -40px;
  font-size: 24px;
  input {
    height: 43px;
    width: 200px;
    font-size: 24px;
  }
`;
const Email = styled.div`
  margin: 20px 0 0 60px;
  font-size: 24px;
  input {
    height: 43px;
    width: 200px;
    font-size: 24px;
  }
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
const HorizontalLine = styled.hr`
  width: 100%;
`;

export default SignUp;
