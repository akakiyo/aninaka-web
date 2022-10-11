import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../../icon/user.svg";
import useAuthUser from "../../../auth/useAuthUser";

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { logout } = useAuthUser();
  const ref = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      const el = ref.current;
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Logo>アニナカ</Logo>
      </Link>

      <RightArea>
        <PageTitleArea>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Top</p>
          </Link>
          <Link to="/friend-lsit" style={{ textDecoration: "none" }}>
            <p>フレンド</p>
          </Link>
        </PageTitleArea>

        <UserIcon src={Icon} onClick={() => setIsShowMenu(!isShowMenu)} />
        {isShowMenu && (
          <Menu ref={ref}>
            <MenuItem>ユーザ情報変更</MenuItem>
            <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
          </Menu>
        )}
      </RightArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  background-color: #ff7f50;
`;
const Logo = styled.span`
  color: white;
  font-size: 50px;
`;
const RightArea = styled.div`
  display: flex;
  margin-right: 20px;
`;
const PageTitleArea = styled.span`
  display: flex;
  p {
    margin-right: 20px;
    color: white;
    font-size: 20px;
    text-decoration: none;
    :hover {
      color: #dad5d5;
    }
  }
`;
const UserIcon = styled.img`
  height: 100%;
  border-radius: 50%;
  background-color: #ff7f50;
`;
const Menu = styled.ul`
  position: absolute;
  top: 60px;
  right: 10px;
  list-style: none;
  width: 150px;
  padding-left: 0;
  padding: auto;
  box-shadow: 0 2px 2px 2px rgb(0 0 0 / 10%);
  background-color: white;
`;
const MenuItem = styled.li`
  width: 100%;
  text-align: center;
  :hover {
    background-color: #dad5d5;
  }
`;
export default Header;
