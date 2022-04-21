import * as React from "react";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import styled from "styled-components";

const mockFirend = [
  {
    name: "井戸はるき",
    isWatching: true,
    animeTitle: "ポケットモンスター",
    title: "ポケモンゲットだぜ",
    storyNum: 1,
    viewingApp: "dアニメストア",
  },
  {
    name: "赤沢きよと",
    isWatching: false,
    animeTitle: "からかい上手の高木さん",
    title: "クリスマス",
    storyNum: 10,
    viewingApp: "dアニメストア",
  },
];

const Home = () => {
  return (
    <FriendList>
      {mockFirend.map((friend) => (
        <>
          <ListItem alignItems="flex-start">
            <AvatarWrapper>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </AvatarWrapper>
            <ListContent>
              <UpperRowContent>
                <FriendName>{friend.name}</FriendName>
                <AnimeTitle>{friend.animeTitle}</AnimeTitle>
              </UpperRowContent>

              <LowerRowContent>
                <StoryNum>第{friend.storyNum}話</StoryNum>
                <Title>{friend.title}</Title>
                <p>at {friend.viewingApp}</p>
              </LowerRowContent>
            </ListContent>
            <Circle isWatching={friend.isWatching} />
          </ListItem>
        </>
      ))}
    </FriendList>
  );
};

const FriendList = styled(List)`
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
const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: auto;
  background-color: ${(props) => (props.isWatching ? "green" : "red")};
`;
export default Home;
