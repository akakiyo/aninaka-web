import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card/Card";
import Pagination from "./Pagination/Pagination";

const Home = () => {
  const [thisSeasonAnimes, setThisSeasonAnimes] = useState(null);
  const [totalPageNum, setTotalPageNum] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getThisSeasonAnimes();
  }, []);

  const getThisSeasonAnimes = (pageNum = 1) => {
    axios
      .get("https://anime.aninaka-api.net/anime/this-season-anime", {
        params: {
          pageNum,
        },
      })
      .then((res) => {
        setThisSeasonAnimes(res.data.works);
        setTotalPageNum(res.data.totalPageNum);
      });
  };
  return (
    <Wrapper>
      <div>
        {thisSeasonAnimes &&
          thisSeasonAnimes.map((thisSeasonAnime) => (
            <Item>
              <Card
                title={thisSeasonAnime.title}
                image={thisSeasonAnime.images.recommended_url}
                officialPageUrl={thisSeasonAnime.official_site_url}
              />
            </Item>
          ))}
      </div>
      <Pagination
        totalPageNum={totalPageNum}
        pageNum={pageNum}
        setPageNum={setPageNum}
        getThisSeasonAnimes={getThisSeasonAnimes}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
const Item = styled.div`
  color: black;
  margin: 20px 5px;
  float: left;
  width: calc(50% - 10px);
  height: 100%;
`;

export default Home;
