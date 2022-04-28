import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAlert } from "react-alert";
import SearchIcon from "@mui/icons-material/Search";
import Icon from "../../icon/user.svg";
import useFirebaseAuth from "../../auth/useFirebaseAuth";

const AddFriend = () => {
  const [searchWord, setSearchWord] = useState();
  const [findedUsers, setFindedUsers] = useState([]);
  const customAlert = useAlert();
  const { userId } = useFirebaseAuth();

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
const InputArea = styled.div`
  display: flex;
  margin-left: 100px;
  margin-bottom: 50px;
`;
const InputSearchWord = styled.input`
  height: 30px;
  width: 300px;
  margin: auto 0 auto 0;
  padding: 3px 10px;
  border: 2px solid black;
  border-radius: 20px;
  color: black;
`;

const SearchButton = styled.button`
  width: 3.5em;
  height: 3em;
  margin: auto 0 auto -20px;
  border: none;
  color: #fff;
  background: #000000;
  outline: none;
  cursor: pointer;
`;
const Content = styled.div`
  margin-left: 100px;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 500px;
  margin: 10px;
  border: solid #efeaea;
  border-radius: 1em;
`;
const ListItemLeft = styled.div``;
const UserIcon = styled.img`
  height: 90px;
  width: 90px;
  border-radius: 50%;
`;
const ListItemCenter = styled.div``;
const ListItemRight = styled.div`
  margin-right: 10px;
  margin-left: auto;
`;
const AddFrinedButton = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 6px;
  background-color: white;
  font-size: 25px;
  :hover {
    background-color: #e6dfdf;
  }
`;
export default AddFriend;
