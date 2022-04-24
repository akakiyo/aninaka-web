import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Icon from "./user.svg";
import useFirebaseAuth from "../../auth/useFirebaseAuth";

const FriendList = () => {
  const { currentUser } = useFirebaseAuth();
  const userId = currentUser.multiFactor.user.uid;
  const [viewingList, setViewingList] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/friend/friend-list`,
      params: { userId },
    }).then((res) => {
      setViewingList(res.data);
    });
  }, [userId]);

  return (
    <Wrapper>
      <AddFriendArea>
        <Link to="/add-friend">
          <TransitionAddFriend>フレンドの追加</TransitionAddFriend>
        </Link>
      </AddFriendArea>
      <StyledList>
        {viewingList &&
          viewingList.map((viewingAnime) => (
            <ListItem alignItems="flex-start">
              <div>
                <UserIcon src={Icon} />
                <FriendName>{viewingAnime.name}</FriendName>
              </div>

              <ListContent>
                <UpperRowContent>
                  <Title>{viewingAnime.title}</Title>
                  <ViewingApp>at {viewingAnime.viewingApp}</ViewingApp>
                  <Date>
                    {moment(viewingAnime.date).format("YYYY年M月D日H時mm分")}
                  </Date>
                </UpperRowContent>
                <LowerRowContent>
                  <StoryNum>第{viewingAnime.story_number}話</StoryNum>
                  <SubTitle>{viewingAnime.sub_title}</SubTitle>
                  <ReactStars
                    size={24}
                    edit={false}
                    value={viewingAnime.rating}
                  ></ReactStars>
                </LowerRowContent>
              </ListContent>
            </ListItem>
          ))}
      </StyledList>
    </Wrapper>
  );
};

const UserIcon = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: auto 30px auto 30px;
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 700;
`;
const StyledList = styled(List)`
  width: 100%;
`;
const Date = styled.p``;
const ListItem = styled.div`
  display: flex;
  border: solid #efeaea;
  margin: 30px auto 30px auto;
  border-radius: 1em;
  width: 90%;
`;
const UpperRowContent = styled.div`
  display: flex;
  margin: 0;
`;
const LowerRowContent = styled.div`
  display: flex;
  margin: 0;
`;
const ListContent = styled.div`
  margin-left: 10px;
  width: 90%;
`;
const FriendName = styled.p`
  margin: auto 30px auto 30px;
  width: 20%;
`;
const StoryNum = styled.p`
  width: 10%;
`;
const Title = styled.p`
  width: 40%;
  font-weight: bold;
  font-size: 20px;
`;
const SubTitle = styled.p`
  width: 60%;
`;
const ViewingApp = styled.p`
  width: 30%;
`;
const TransitionAddFriend = styled.button`
  width: 200px;
  height: 56px;
  border: none;
  border-radius: 6px;
  background-color: green;
  color: white;
`;
const AddFriendArea = styled.div`
  margin-right: 50px;
  text-align: right;
`;
export default FriendList;
