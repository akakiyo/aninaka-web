import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactStars from "react-stars";
import useFirebaseAuth from "../../../auth/useFirebaseAuth";
const AddAnimeModal = (props) => {
  const { close, getNewAnimeData } = props;
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
    await getNewAnimeData();
    close();
  };
  const handleReset = () => {
    setTitle("");
    setStoryNum("");
    setSubTitle("");
    setStarRating("");
    setViewingApp("");
  };
  return (
    <Wrapper>
      <TopContent>
        <ProcessingContent>視聴アニメの追加</ProcessingContent>
        <CloseButton onClick={close}>x</CloseButton>
      </TopContent>

      <TitleArea>
        <Text>タイトル</Text>
        <InputText
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </TitleArea>
      <StoryNumArea>
        <Text>話数：</Text>
        <InputNum
          type="text"
          value={storyNum}
          onChange={(event) => setStoryNum(event.target.value)}
        />
      </StoryNumArea>
      <SubTitleArea>
        <Text>サブタイトル：</Text>
        <InputText
          type="text"
          value={subTitle}
          onChange={(event) => setSubTitle(event.target.value)}
        />
      </SubTitleArea>
      <ViewingAppArea>
        <Text>視聴アプリ：</Text>
        <ViewingAppSelect
          value={viewingApp}
          onChange={(evet) => setViewingApp(evet.target.value)}
        >
          <option hidden>視聴アプリ選択</option>
          <option value="dアニメストア">dアニメストア</option>
          <option value="ABEMA">ABEMA</option>
          <option value="Hulu">Hulu</option>
          <option value="Paravi">Paravi</option>
          <option value="Netflix">Netflix</option>
          <option value="FODプレミアム">FODプレミアム</option>
          <option value="dTV">dTV</option>
          <option value="U-NEXT.">U-NEXT.</option>
          <option value="Amazonプライム・ビデオ">Amazonプライム・ビデオ</option>
          <option value="ディズニープラス">ディズニープラス</option>
          <option value="アニメ放題">アニメ放題</option>
          <option value="バンダイチャンネル">バンダイチャンネル</option>
          <option value="その他">その他</option>
        </ViewingAppSelect>
      </ViewingAppArea>
      <StarRatingArea>
        <Text>評価：</Text>
        <StyledStars
          value={starRating}
          count={5}
          size={24}
          color={"#fff"}
          onChange={(rating) => setStarRating(rating)}
        />
      </StarRatingArea>
      <ButtonsArea>
        <StyledButton
          onClick={() => {
            handleReset();
          }}
        >
          リセット
        </StyledButton>
        <StyledButton
          onClick={() => {
            handleSubmit();
          }}
        >
          追加
        </StyledButton>
      </ButtonsArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  overflow: scroll;
  ::-webkit-scrollbar {
    /* Chrome, Safari 対応 */
    display: none;
  }
  padding: 10px;
  border-radius: 10px;
`;

const ProcessingContent = styled.p`
  margin: auto -20px auto auto;
  font-weight: bold;
  font-size: 30px;
`;
const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: auto;
  border-radius: 50%;
  font-size: 20px;
  /* border: none; */
  background-color: white;
`;

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
  margin: auto;
`;
const InputText = styled.input`
  width: 300px;
  height: 30px;
  font-size: 20px;
  margin: auto auto auto 0;
`;
const InputNum = styled.input`
  width: 50px;
  height: 30px;
  font-size: 20px;
  margin: auto auto auto 0;
`;
const Text = styled.p`
  font-size: 20px;
  width: 150px;
  margin-left: 30px;
`;
const ViewingAppSelect = styled.select`
  width: 200px;
  height: 30px;
  margin: auto auto auto 0;
`;
const TopContent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const StyledStars = styled(ReactStars)`
  margin: auto auto auto 0;
`;
const ButtonsArea = styled.div`
  display: flex;
  padding: 10px 100px 0 100px;
  justify-content: space-between;
`;
const StyledButton = styled.button`
  color: #fff;
  background-color: #ff7f50;
  border-radius: 100vh;
  width: 100px;
  height: 50px;
  border: none;
  :hover {
    color: #fff;
    background: #f64505;
  }
`;
export default AddAnimeModal;
