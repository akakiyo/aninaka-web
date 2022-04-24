import styled from "styled-components";
import { confirmable, createConfirmation } from "react-confirm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState } from "react";
const Confirmation = ({
  proceedLabel = "OK",
  cancelLabel = "キャンセル",
  title,
  confirmation,
  proceed,
  enableEscape = true,
}) => {
  const [show, setShow] = useState(true);
  return (
    <Modal open={show}>
      <Container>
        <WarningAmberIcon />
        <Type>確認</Type>
        <Message>
          {confirmation.split("\n").map((text, i) => (
            <span key={String(i) + "_" + text}>
              <span>{text}</span>
              <br />
            </span>
          ))}
        </Message>
        <ButtonArea>
          <CancelButton
            onClick={() => {
              setShow(false);
              proceed(false);
            }}
          >
            {cancelLabel}
          </CancelButton>
          <OKButton
            onClick={() => {
              setShow(false);
              proceed(true);
            }}
          >
            {proceedLabel}
          </OKButton>
        </ButtonArea>
      </Container>
    </Modal>
  );
};

const Container = styled(Box)`
  color: white;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background-color: #f47c04;
  border-radius: 30px;
  padding: 35px;
`;
const Type = styled.span`
  font-size: 20px;
  margin-left: 5%;
`;
const Message = styled.div`
  margin-top: 10%;
  font-size: 15px;
`;
const ButtonArea = styled.div`
  position: absolute;
  right: 10%;
  bottom: 10%;
`;
const CancelButton = styled.button`
  background-color: white;
  border: none;
  color: black;
  font-size: 20px;
  border-radius: 10px;
  width: 130px;
  height: 30px;
  margin: 10px;
  :hover {
    background-color: #ffffff8f;
  }
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

export function customConfirm(
  confirmation,
  proceedLabel,
  cancelLabel,
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
