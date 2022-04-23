import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Icon from "./user.svg";
import useFirebaseAuth from "../../auth/useFirebaseAuth";

const AddFriend = () => {
  const [searchWord, setSearchWord] = useState();
  const [findedUsers, setFindedUsers] = useState([]);
  const { currentUser } = useFirebaseAuth();
  const userId = currentUser.multiFactor.user.uid;

  const searchFriend = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/friend`,
      params: { searchWord },
    }).then((res) => {
      setFindedUsers(res.data.findedUsers);
    });
  };
  const addFriend = (addFriendId) => {
    axios({
      method: "POST",
      url: `http://localhost:8080/friend`,
      data: { addFriendId, userId },
    });
  };
  return (
    <>
      <InputArea>
        <p>フレンド検索：</p>
        <InputSearchWord
          type="text"
          name="searchWord"
          placeholder="idまたはユーザ名を入力してください"
          onChange={(event) => setSearchWord(event.target.value)}
        />
        <SearchButton onClick={() => searchFriend()}>検索</SearchButton>
      </InputArea>
      <div>ヒット件数：{findedUsers.length}</div>
      {findedUsers &&
        findedUsers.map((findedUser) => (
          <ListItem>
            <ListItemLeft>
              <UserIcon src={Icon} />
            </ListItemLeft>
            <ListItemCenter> {findedUser.name}</ListItemCenter>
            <ListItemRight>
              <button onClick={() => addFriend(findedUser.user_id)}>+</button>
            </ListItemRight>
          </ListItem>
        ))}
    </>
  );
};

const InputSearchWord = styled.input`
  width: 500px;
  height: 30px;
`;
const InputArea = styled.div`
  display: flex;
`;
const SearchButton = styled.button`
  height: 35px;
`;
const ListItem = styled.div`
  display: flex;
  border: solid #efeaea;
  margin: 10px;
  border-radius: 1em;
  height: 80px;
  align-items: center;
`;
const UserIcon = styled.img`
  height: 90px;
  width: 90px;
  border-radius: 50%;
`;
const ListItemLeft = styled.div``;
const ListItemCenter = styled.div``;
const ListItemRight = styled.div`
  margin-right: 10px;
  margin-left: auto;
`;
export default AddFriend;
