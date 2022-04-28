import styled from "styled-components";
import axios from "axios";
import deleteIcon from "./delete.svg";

const DeleteButton = ({ id, getNewAnimeData }) => {
  const deleteAnime = async (id) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/personal`,
      params: { id },
    });
    await getNewAnimeData();
  };
  return (
    <Wrapper onClick={() => deleteAnime(id)}>
      <DeleteIcon src={deleteIcon} />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  height: 50px;
  margin-right: 50px;
  margin-left: auto;
  border-radius: 6px;
  border-color: #f5f5f5;
  background-color: white;
`;
const DeleteIcon = styled.img`
  height: 40px;
  width: 40px;
`;

export default DeleteButton;
