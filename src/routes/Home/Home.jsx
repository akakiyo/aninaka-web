import { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import styled from "styled-components";
import axios from "axios";
import ReactStars from "react-stars";
import moment from "moment";
import Icon from "../../icon/user.svg";
import DeleteButton from "./DeleteButton";
import useAuthUser from "../../auth/useAuthUser";
import AddAnimeModal from "./AddAnimeModal";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [userName, setUserName] = useState();
  const { userId } = useAuthUser();
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
  });

  return (
    <>
      <Left>
        <UserIcon src={Icon} />
        <AccountInfo>
          <div>ユーザー名： {userName}</div>
          <div>ID: {userId}</div>
        </AccountInfo>
      </Left>
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
