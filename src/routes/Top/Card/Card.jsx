import React from "react";
import styled from "styled-components";
import Image from "./Image.jsx";

const Card = ({ title, image, officialPageUrl }) => {
  const tags = [
    { id: 1, word: "主人公最強" },
    { id: 2, word: "恋愛" },
    { id: 3, word: "感動" },
    { id: 4, word: "RPG" },
  ];
  return (
    <Wrapper>
      <ActionsArea>
        <ImageArea>
          <Image image={image} />
        </ImageArea>
        <Content>
          <Title>{title}</Title>
          <Tags>
            {tags &&
              Object.values(tags).map((tag) => {
                return <TagButton key={tag.id}>{tag.word}</TagButton>;
              })}
          </Tags>
        </Content>
      </ActionsArea>
      <ButtonsArea>
        <RegisterButton>
          <Start />
          <Text> お気に入り</Text>
        </RegisterButton>
        <RegisterButton>
          <Heart />
          <Text>気になる</Text>
        </RegisterButton>
      </ButtonsArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 460px;
  border-radius: 20px;
  background-color: #fae8e2;
  margin: 5px 20px;
`;
const RegisterButton = styled.button`
  display: flex;
  border: none;
  background-color: #ffa200;
  border-radius: 5px;
  margin: 5px;
  width: 130px;
  height: 40px;
`;
const Start = styled.div`
  width: 25px;
  height: 25px;
  margin: auto;
  background: yellow;
  clip-path: polygon(
    50% 5%,
    61% 40%,
    98% 40%,
    68% 62%,
    79% 96%,
    50% 75%,
    21% 96%,
    32% 62%,
    2% 40%,
    39% 40%
  );
`;
const Heart = styled.div`
  color: red;
  position: relative;
  margin: auto 5px;

  width: 9px;
  height: 9px;
  border-left: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
  transform: rotate(-45deg) scale(1); /*scale要調整*/
  background: red; /*背景色*/
  ::before,
  ::after {
    content: "";
    position: absolute;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    background: red;
  }
  ::before {
    top: -5px;
    left: -1px;
    width: 8px;
    height: 5px;
    border-radius: 5px 5px 0 0;
    border-left: solid 1px currentColor;
  }
  ::after {
    top: 0px;
    left: 8px;
    width: 5px;
    height: 8px;
    border-radius: 0 5px 5px 0;
    border-bottom: solid 1px currentColor;
  }
`;

const Text = styled.div`
  margin: auto;
`;
const ActionsArea = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 0px;
`;
const ImageArea = styled.div`
  top: 0;
  padding: 10px;
  text-align: center;
  height: 250px;
`;
const Content = styled.div`
  position: relative;
  height: 100%;
  width: 90%;
  color: #000000;
  font-size: 18px;
`;
const Title = styled.h1`
  padding-right: 5px;
  font-size: 25px;
  //2行以上は省略
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const Tags = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ButtonsArea = styled.div`
  position: absolute;
  width: 100%;
  bottom: 10px;
  display: flex;
`;
const TagButton = styled.a`
  display: inline-block;
  padding: 0.3em 1em;
  margin-left: 5px;
  background: #ff7f50;
  border: solid 2px #ff7f50;
  border-radius: 20px;
  transition: 0.4s;
  color: white;
  text-decoration: none;
`;
export default Card;
