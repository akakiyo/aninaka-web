import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import ReactStars from "react-stars";
import moment from "moment";
import Icon from "./user.svg";
import deleteIcon from "./delete.svg";
import useFirebaseAuth from "../../auth/useFirebaseAuth";

const Home = () => {
  const { currentUser } = useFirebaseAuth();
  const [animeList, setAnimeList] = useState([]);
  const [userName, setUserName] = useState();
  const userId = currentUser.multiFactor.user.uid;

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

  const deleteAnime = (id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:8080/personal`,
      params: { id },
    });
  };

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
          <TransitionAddAnimeLink to="/add-anime">
            <TransitionAddAnime>視聴アニメの追加</TransitionAddAnime>
          </TransitionAddAnimeLink>
        </TopItem>
        <List>
          {animeList.map((anime) => (
            <ListContent>
              <UpperRowContent>
                <AnimeTitle>{anime.title}</AnimeTitle>
                <ViewingApp>at {anime.viewingApp}</ViewingApp>
                <ViewingDate>
                  {moment(anime.date).format("YYYY年M月D日H時mm分")}
                </ViewingDate>
              </UpperRowContent>

              <LowerRowContent>
                <StoryNum>第{anime.story_number}話</StoryNum>
                <Title>{anime.sub_title}</Title>
                <ReactStars
                  size={24}
                  edit={false}
                  value={anime.rating}
                ></ReactStars>
                <DeleteButton onClick={() => deleteAnime(anime.id)}>
                  <DeleteIcon src={deleteIcon} />
                </DeleteButton>
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
  margin-bottom: -20px;
`;
const LowerRowContent = styled.div`
  display: flex;
  margin-left: 30px;
`;
const ListContent = styled.div`
  margin-left: 10px;
  margin-top: 20px;
  width: 90%;
`;
const StoryNum = styled.p`
  width: 10%;
`;
const Title = styled.p`
  width: 30%;
`;

const AnimeTitle = styled.p`
  width: 40%;
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
  height: 500px;
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
  /* margin-left: 300px; */
`;
const ViewingApp = styled.p`
  margin-top: 20px;
`;
const ViewingDate = styled.p`
  margin-top: 20px;
  margin-left: 20px;
`;
const List = styled.div`
  margin-top: 30px;
`;
const DeleteIcon = styled.img`
  height: 40px;
  width: 40px;
`;
const DeleteButton = styled.button`
  margin-right: 50px;
  height: 50px;
  margin-left: auto;
  background-color: white;
  border-radius: 6px;
  border-color: #f5f5f5;
`;
const TransitionAddAnimeLink = styled(Link)`
  margin-left: auto;
  margin-right: 50px;
`;
export default Home;
