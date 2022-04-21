import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};
export default Layout;
