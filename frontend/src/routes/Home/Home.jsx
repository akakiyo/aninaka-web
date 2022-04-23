import { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "./user.svg";
import { Link } from "react-router-dom";
import useFirebaseAuth from "../../auth/useFirebaseAuth";
import axios from "axios";
import ReactStars from "react-stars";

const Home = () => {
  const { currentUser } = useFirebaseAuth();
  const [animeList, setAnimeList] = useState([]);
  const [userName, setUserName] = useState();
  const userId = currentUser.multiFactor.user.uid;
  console.log("userId", userId);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/personal`,
      params: { userId: userId },
    }).then((res) => {
      setUserName(res.data.userName);
      setAnimeList(res.data.animeList);
    });
  }, [userId]);
  console.log(animeList);
  return (
    <Wrapper>
      <Left>
        <UserIcon src={Icon} />
        <div>ユーザー名：{userName}</div>
        <div>ID:{userId}</div>
      </Left>
      <Right>
        <TopItem>
          <p>過去の視聴履歴</p>
          <Link to="/add-anime">
            <TransitionAddAnime>視聴アニメの追加</TransitionAddAnime>
          </Link>
        </TopItem>
        <List>
          {animeList.map((anime) => (
            <ListContent>
              <UpperRowContent>
                <AnimeTitle>{anime.title}</AnimeTitle>
                <ReactStars
                  size={24}
                  edit={false}
                  value={anime.rating}
                ></ReactStars>
              </UpperRowContent>

              <LowerRowContent>
                <StoryNum>第{anime.story_number}話</StoryNum>
                <Title>{anime.sub_title}</Title>
                <p>at {anime.viewingApp}</p>
                <p>{anime.date}</p>
              </LowerRowContent>
            </ListContent>
          ))}
        </List>
      </Right>
    </Wrapper>
  );
};

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
const StoryNum = styled.p`
  width: 10%;
`;
const Title = styled.p`
  width: 30%;
`;

const AnimeTitle = styled.p`
  margin: 10px 0 0 0;
  width: 50%;
  font-weight: bold;
  font-size: 20px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Left = styled.div`
  margin-left: 10px;
  border-style: solid;
  border-radius: 6px;
  border-color: gray;
  width: 400px;
  text-align: center;
`;
const Right = styled.div`
  margin-left: 10%;
  width: 100%;
`;
const UserIcon = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;
const TopItem = styled.div`
  display: flex;
`;
const TransitionAddAnime = styled.button`
  width: 200px;
  height: 56px;
  border: none;
  border-radius: 6px;
  background-color: green;
  color: white;
  margin-left: 300px;
`;

const List = styled.div`
  margin-top: 50px;
`;
export default Home;
