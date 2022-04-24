import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Icon from "./user.svg";
import useFirebaseAuth from "../../auth/useFirebaseAuth";
import { useAlert } from "react-alert";
import SearchIcon from "@mui/icons-material/Search";

const AddFriend = () => {
  const customAlert = useAlert();
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
    }).then(() => {
      customAlert.success("");
    });
  };

  return (
    <Wrapper>
      <InputArea>
        <p>フレンド検索：</p>
        <InputSearchWord
          type="text"
          name="searchWord"
          placeholder="idまたはユーザ名を入力してください"
          onChange={(event) => setSearchWord(event.target.value)}
        />
        <SearchButton onClick={() => searchFriend()}>
          <SearchIcon />
        </SearchButton>
      </InputArea>
      <Content>
        <div>ヒット件数：{findedUsers.length}</div>
        {findedUsers &&
          findedUsers.map((findedUser) => (
            <ListItem>
              <ListItemLeft>
                <UserIcon src={Icon} />
              </ListItemLeft>
              <ListItemCenter> {findedUser.name}</ListItemCenter>
              <ListItemRight>
                <AddFrinedButton onClick={() => addFriend(findedUser.user_id)}>
                  +
                </AddFrinedButton>
              </ListItemRight>
            </ListItem>
          ))}
      </Content>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 500px;
`;
const InputSearchWord = styled.input`
  width: 300px;
  height: 30px;
  margin: auto 0 auto 0;
  border: 2px solid black;
  color: black;
  padding: 3px 10px;
  border-radius: 20px;
`;
const InputArea = styled.div`
  display: flex;
  margin-left: 100px;
  margin-bottom: 50px;
`;
const SearchButton = styled.button`
  height: 35px;
  margin: auto 0 auto -20px;
  cursor: pointer;
  border: none;
  background: #000000;
  color: #fff;
  width: 3.5em;
  height: 3em;
  outline: none;
`;
const ListItem = styled.div`
  display: flex;
  border: solid #efeaea;
  margin: 10px;
  border-radius: 1em;
  height: 80px;
  width: 500px;
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
const Content = styled.div`
  margin-left: 100px;
`;
const AddFrinedButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  font-size: 25px;
  background-color: white;
  :hover {
    background-color: #e6dfdf;
  }
`;
export default AddFriend;
