import styled from "styled-components";

const Body = ({ children, page }) => {
  return <Container page={page}>{children}</Container>;
};
const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 5% 0;
`;
export default Body;
