import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <Right>© 2022 aninaka</Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  background-color: black;
`;
const Right = styled.p`
  color: white;
  margin: 0;
  text-align: center;
`;

export default Footer;
