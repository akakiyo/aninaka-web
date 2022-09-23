import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AlertTemplate = ({ style, options, message, close }) => {
  const type = options.type;
  let title = "";
  switch (type) {
    case "error":
      title = "失敗";
      break;
    case "success":
      title = "フレンド登録しました";
      break;
    case "info":
      title = "お知らせ";
      break;
    default:
      break;
  }
  return (
    <Container type={type} style={style}>
      <div>
        {type === "error" && <ErrorOutlineIcon />}
        {type === "success" && <CheckCircleOutlineIcon />}
        {type === "info" && <InfoOutlinedIcon />}
        <Type>{title}</Type>

        {/* <Message>
          {message.split("\n").map((text, i) => (
            <span key={String(i) + "_" + text}>
              <span>{text}</span>
              <br />
            </span>
          ))}
        </Message> */}
      </div>
      <ButtonArea>
        <OKButton onClick={close}>OK</OKButton>
      </ButtonArea>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  color: white;
  background-color: ${(props) =>
    props.type === "error"
      ? "#d4342c"
      : props.type === "success"
      ? "#3c8c3c"
      : "#048cd4"};
  width: 250px;
  height: auto;
  border-radius: 30px;
  padding: 10%;
`;
const Type = styled.span`
  font-size: 20px;
  margin-left: 5%;
`;
const ButtonArea = styled.div`
  position: relative;
  text-align: right;
`;
const OKButton = styled.button`
  background-color: white;
  border: none;
  color: black;
  font-size: 20px;
  border-radius: 10px;
  width: 80px;
  height: 30px;
  margin: 10px;
  :hover {
    background-color: #ffffff8f;
  }
`;

export default AlertTemplate;
