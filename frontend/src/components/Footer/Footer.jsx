import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <Right>© 2022 aninaka</Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: black;
`;
const Right = styled.p`
  text-align: center;
  color: white;
`;

export default Footer;
