import { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import styled from "styled-components";
import axios from "axios";
import ReactStars from "react-stars";
import moment from "moment";
import Icon from "../../icon/user.svg";
import DeleteButton from "./DeleteButton";
import useFirebaseAuth from "../../auth/useFirebaseAuth";
import AddAnimeModal from "./AddAnimeModal";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [userName, setUserName] = useState();
  const { userId } = useFirebaseAuth();
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
  });

  const getNewAnimeData = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/personal`,
      params: { userId: userId },
    }).then((res) => {
      setUserName(res.data.userName);
      setAnimeList(res.data.animeList);
    });
  };

  useEffect(() => {
    getNewAnimeData();
  }, []);

  return (
    <>
      <Left>
        <UserIcon src={Icon} />
        <AccountInfo>
          <div>ユーザー名： {userName}</div>
          <div>ID: {userId}</div>
        </AccountInfo>
      </Left>
      <Right>
        <TopItem>
          <p>過去の視聴履歴</p>
          <TransitionAddAnime onClick={open}>
            視聴アニメの追加
          </TransitionAddAnime>
        </TopItem>
        <List>
          {animeList.map((anime) => (
            <ListContent>
              <UpperRowContent>
                <AnimeTitle>{anime.title}</AnimeTitle>
                <ViewingApp>at {anime.viewing_app}</ViewingApp>
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
                <DeleteButton id={anime.id} getNewAnimeData={getNewAnimeData} />
              </LowerRowContent>
            </ListContent>
          ))}
        </List>
        <Modal>
          <AddAnimeModal close={close} getNewAnimeData={getNewAnimeData} />
        </Modal>
      </Right>
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
const Right = styled.div`
  margin-left: 10%;
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
  margin-left: auto;
  margin-right: 200px;
`;
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

export default Home;
