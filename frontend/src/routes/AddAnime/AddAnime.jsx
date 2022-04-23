import styled from "styled-components";
import { useState } from "react";
import ReactStars from "react-stars";
import axios from "axios";
import useFirebaseAuth from "../../auth/useFirebaseAuth";
const AddAnime = () => {
  const { currentUser } = useFirebaseAuth();
  const userId = currentUser.multiFactor.user.uid;
  const [title, setTitle] = useState();
  const [storyNum, setStoryNum] = useState();
  const [subTitle, setSubTitle] = useState();
  const [starRating, setStarRating] = useState();
  const [viewingApp, setViewingApp] = useState();

  const handleSubmit = async () => {
    const data = {
      userId,
      title,
      storyNum,
      subTitle,
      starRating,
      viewingApp,
    };
    await axios({
      method: "POST",
      url: `http://localhost:8080/personal/add-anime`,
      data,
    });
  };
  return (
    <>
      <div>視聴アニメの追加ページ</div>
      <TitleArea>
        <Text>タイトル：</Text>
        <InputText
          type="text"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </TitleArea>
      <StoryNumArea>
        <h1>話数：</h1>
        <input
          type="text"
          name="title"
          onChange={(event) => setStoryNum(event.target.value)}
        />
      </StoryNumArea>
      <SubTitleArea>
        <Text>サブタイトル：</Text>
        <InputText
          type="text"
          name="title"
          onChange={(event) => setSubTitle(event.target.value)}
        />
      </SubTitleArea>
      <ViewingAppArea>
        <h1>視聴アプリ：</h1>
        <input
          type="text"
          name="title"
          onChange={(event) => setViewingApp(event.target.value)}
        />
      </ViewingAppArea>
      <StarRatingArea>
        <h1>評価：</h1>
        <ReactStars
          count={5}
          size={24}
          color={"#fff"}
          onChange={(rating) => setStarRating(rating)}
        ></ReactStars>
      </StarRatingArea>
      <div
        onClick={() => {
          handleSubmit();
        }}
      >
        <button>追加</button>
      </div>
    </>
  );
};
const TitleArea = styled.div`
  display: flex;
`;
const StoryNumArea = styled.div`
  display: flex;
`;
const SubTitleArea = styled.div`
  display: flex;
`;
const ViewingAppArea = styled.div`
  display: flex;
`;
const StarRatingArea = styled.div`
  display: flex;
`;
const InputText = styled.input`
  width: 500px;
  height: 50px;
  font-size: 20px;
`;
const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default AddAnime;
