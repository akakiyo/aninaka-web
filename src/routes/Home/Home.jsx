import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import useAuthUser from "../../auth/useAuthUser";
import Card from "./Card/Card";

const Home = () => {
  const [thisSeasonAnimes, setThisSeasonAnimes] = useState(null);

  useEffect(() => {
    getThisSeasonAnimes();
  }, []);

  const getThisSeasonAnimes = () => {
    axios
      .get("http://localhost:8082/anime/this-season-anime", {})
      .then((res) => {
        setThisSeasonAnimes(res.data.works);
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
