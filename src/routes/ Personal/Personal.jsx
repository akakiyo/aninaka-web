import { useState } from "react";
import styled from "styled-components";
import Icon from "../../icon/user.svg";
import useAuthUser from "../../auth/useAuthUser";

const Personal = () => {
  const [userName] = useState();
  const { userId } = useAuthUser();

  return (
    <>
      <Left>
        <UserIcon src={Icon} />
        <AccountInfo>
          <div>ユーザー名： {userName}</div>
          <div>ID: {userId}</div>
        </AccountInfo>
      </Left>
    </>
  );
};

const Left = styled.div`
  display: flex;
  width: 700px;
  border-style: solid;
  margin: 0 auto 30px auto;
  border-color: gray;
  border-radius: 6px;
  text-align: center;
`;
const UserIcon = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;
const AccountInfo = styled.div`
  margin: auto auto auto 20px;
  text-align: left;
`;

export default Personal;
