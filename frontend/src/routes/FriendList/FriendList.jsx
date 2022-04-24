import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
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
      <Link to="/add-friend">
        <TransitionAddAnime>フレンドの追加</TransitionAddAnime>
      </Link>
      {viewingList &&
        viewingList.map((viewingAnime) => (
          <>
            <ListItem alignItems="flex-start">
              <AvatarWrapper>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </AvatarWrapper>
              <ListContent>
                <UpperRowContent>
                  <FriendName>{viewingAnime.name}</FriendName>
                  <AnimeTitle>{viewingAnime.title}</AnimeTitle>
                  <p>
                    {moment(viewingAnime.date).format("YYYY年M月D日H時mm分")}
                  </p>
                </UpperRowContent>

                <LowerRowContent>
                  <StoryNum>第{viewingAnime.story_number}話</StoryNum>
                  <Title>{viewingAnime.sub_title}</Title>
                  <p>at {viewingAnime.viewingApp}</p>
                </LowerRowContent>
              </ListContent>
            </ListItem>
          </>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled(List)`
  width: 100%;
  max-width: 700;
`;
const AvatarWrapper = styled(ListItemAvatar)`
  margin-left: 15px;
`;
const ListItem = styled.div`
  display: flex;
  border: solid #efeaea;
  margin: 10px;
  border-radius: 1em;
  height: 80px;
  align-items: center;
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
  margin: 10px 0 0 0;
  width: 25%;
`;
const AnimeTitle = styled.p`
  margin: 10px 0 0 0;
  width: 50%;
`;
const StoryNum = styled.p`
  width: 25%;
`;
const Title = styled.p`
  width: 40%;
`;

const TransitionAddAnime = styled.button`
  width: 200px;
  height: 56px;
  border: none;
  border-radius: 6px;
  background-color: green;
  color: white;
`;
export default FriendList;
