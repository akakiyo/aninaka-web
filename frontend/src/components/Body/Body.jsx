import styled from "styled-components";

const Body = ({ children, page }) => {
  return <Container page={page}>{children}</Container>;
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 5% 0;
`;
export default Body;
