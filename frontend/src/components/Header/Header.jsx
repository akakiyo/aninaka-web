import Icon from "./user.svg";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import useFirebaseAuth from "../../auth/useFirebaseAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { logout } = useFirebaseAuth();
  const ref = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      const el = ref.current;
      // console.log("el", el);
      // console.log("event.target", event.target);
      // console.log(el.contains(event.target));
      if (!el || el.contains(event.target)) {
        return;
      }
      setIsShowMenu(false);
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref]);
  return (
    <Wrapper>
      <Logo>アニナカ</Logo>
      <RightArea>
        <PageTitleArea>
          <Link to="/" style={{ textDecoration: "none" }}>
            <PageTitle>Home</PageTitle>
          </Link>
          <Link to="/friend-lsit" style={{ textDecoration: "none" }}>
            <PageTitle>フレンド</PageTitle>
          </Link>
        </PageTitleArea>

        <UserIcon src={Icon} onClick={() => setIsShowMenu(!isShowMenu)} />
        {isShowMenu && (
          <Menu ref={ref}>
            <MenuItem>ユーザ情報変更</MenuItem>
            <MenuItem onClick={() => logout()}>サインアウト</MenuItem>
          </Menu>
        )}
      </RightArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  background-color: #ff7f50;
  justify-content: space-between;
`;
const Logo = styled.span`
  /* text-align: center; */
  color: white;
  font-size: 50px;
`;
const RightArea = styled.div`
  margin-right: 20px;
  display: flex;
`;
const UserIcon = styled.img`
  height: 100%;
  background-color: #ff7f50;
  border-radius: 50%;
`;

const Menu = styled.ul`
  width: 150px;
  position: absolute;
  top: 60px;
  right: 10px;
  list-style: none;
  background-color: white;
  padding-left: 0;
  padding: auto;
  box-shadow: 0 2px 2px 2px rgb(0 0 0 / 10%);
`;
const MenuItem = styled.li`
  width: 100%;
  text-align: center;

  :hover {
    background-color: #dad5d5;
  }
`;

const PageTitleArea = styled.span`
  display: flex;
`;
const PageTitle = styled.p`
  color: white;
  text-decoration: none;
  font-size: 20px;
  margin-right: 20px;
  :hover {
    color: #dad5d5;
  }
`;
export default Header;
