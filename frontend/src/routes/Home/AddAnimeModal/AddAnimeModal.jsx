import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactStars from "react-stars";
import useFirebaseAuth from "../../../auth/useFirebaseAuth";
const AddAnimeModal = (props) => {
  const { close, getNewAnimeData } = props;
  const { userId } = useFirebaseAuth();
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
    console.log("実行");
    console.log(
      `${
        process.env.REACT_APP_BACKEND_API || "http://localhost:8080/"
      }personal/add-anime`
    );
    await axios({
      method: "POST",
      url: `${
        process.env.REACT_APP_BACKEND_API || "http://localhost:8080/"
      }personal/add-anime`,
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
      <Header>
        <ProcessingContent>視聴アニメの追加</ProcessingContent>
        <CloseButton onClick={close}>x</CloseButton>
      </Header>
      <InputElement>
        <p>タイトル</p>
        <InputText
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </InputElement>
      <InputElement>
        <p>話数：</p>
        <InputNum
          type="number"
          value={storyNum}
          onChange={(event) => setStoryNum(event.target.value)}
        />
      </InputElement>
      <InputElement>
        <p>サブタイトル：</p>
        <InputText
          type="text"
          value={subTitle}
          onChange={(event) => setSubTitle(event.target.value)}
        />
      </InputElement>
      <InputElement>
        <p>視聴アプリ：</p>
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
      </InputElement>
      <StarRatingArea>
        <p>評価：</p>
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
  height: 500px;
  width: 500px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ProcessingContent = styled.p`
  margin: auto -20px auto auto;
  font-weight: bold;
  font-size: 30px;
`;
const CloseButton = styled.button`
  height: 40px;
  width: 40px;
  margin: 0 10px 0 auto;
  border-radius: 50%;
  background-color: white;
  font-size: 20px;
`;
const InputElement = styled.div`
  display: flex;
  p {
    width: 150px;
    margin-left: 30px;
    font-size: 20px;
  }
`;

const InputText = styled.input`
  height: 30px;
  width: 300px;
  margin: auto auto auto 0;
  font-size: 20px;
`;
const InputNum = styled.input`
  height: 30px;
  width: 50px;
  margin: auto auto auto 0;
  font-size: 20px;
`;
const ViewingAppSelect = styled.select`
  height: 30px;
  width: 200px;
  margin: auto auto auto 0;
`;
const StarRatingArea = styled.div`
  display: flex;
  margin: auto;
  p {
    width: 150px;
    margin-left: 30px;
    font-size: 20px;
  }
`;
const StyledStars = styled(ReactStars)`
  margin: auto auto auto 0;
  p {
    width: 150px;
    margin-left: 30px;
    font-size: 20px;
  }
`;
const ButtonsArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 100px 0 100px;
`;
const StyledButton = styled.button`
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 100vh;
  color: #fff;
  background-color: #ff7f50;

  :hover {
    color: #fff;
    background: #f64505;
  }
`;
export default AddAnimeModal;
