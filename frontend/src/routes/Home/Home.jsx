import { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import styled from "styled-components";
import axios from "axios";
import ReactStars from "react-stars";
import moment from "moment";
import Icon from "./user.svg";
import deleteIcon from "./delete.svg";
import useFirebaseAuth from "../../auth/useFirebaseAuth";
import AddFriendModal from "./AddFriendModal";

const Home = () => {
  const { currentUser } = useFirebaseAuth();
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: false,
  });
  const [animeList, setAnimeList] = useState([]);
  const [userName, setUserName] = useState();
  const userId = currentUser.multiFactor.user.uid;

  const getNewAnimeData = async () => {
    console.log("getData");
    await axios({
      method: "GET",
      url: `http://localhost:8080/personal`,
      params: { userId: userId },
    }).then((res) => {
      console.log(res.data);
      setUserName(res.data.userName);
      setAnimeList(res.data.animeList);
    });
  };

  useEffect(() => {
    getNewAnimeData();
  }, []);

  const deleteAnime = async (id) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/personal`,
      params: { id },
    });
    await getNewAnimeData();
  };

  return (
    <Wrapper>
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
        <Modal>
          <AddFriendModal close={close} getNewAnimeData={getNewAnimeData} />
        </Modal>
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
  /* display: flex; */
`;
const Left = styled.div`
  margin-left: 10px;
  border-style: solid;
  border-radius: 6px;
  border-color: gray;
  display: flex;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  /* height: 500px; */
  text-align: center;
  margin-bottom: 30px;
`;
const Right = styled.div`
  margin-left: 10%;
`;
const UserIcon = styled.img`
  height: 150px;
  width: 150px;
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
  margin-left: auto;
  margin-right: 200px;
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
const AccountInfo = styled.div`
  margin: auto auto auto 20px;
  text-align: left;
`;
export default Home;
