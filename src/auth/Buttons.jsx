import styled from "styled-components";
export const DoneButton = styled.button`
  color: #faf9f9;
  font-size: 24px;
  width: 340px;
  height: 56px;
  background: #ff7f50;
  border: solid 1px #ff7f50;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  :active {
    border: solid 1px #03a9f4;
    box-shadow: none;
    text-shadow: none;
  }
`;

export const TransitionOtherButton = styled.button`
  color: #ff7f50;
  font-size: 24px;
  width: 340px;
  height: 56px;
  background: #faf9f9;
  border: solid 1px #ff7f50;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  margin: 32px;
`;
