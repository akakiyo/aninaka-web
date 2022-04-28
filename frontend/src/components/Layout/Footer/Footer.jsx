import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <Right>© 2022 aninaka</Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  bottom: 0;
  height: 100px;
  width: 100%;
  background-color: black;
`;
const Right = styled.p`
  color: white;
  text-align: center;
`;

export default Footer;
