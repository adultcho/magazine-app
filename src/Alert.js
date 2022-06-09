import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

//firebase
import { auth } from "./shared/firebase";
import { signOut } from "firebase/auth";

//style
import { ShortBtn, PageHeader } from "./bundle";
import { ImHome3 } from "react-icons/im";

const Alert = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Link to="/">
          <HomeBtn>홈</HomeBtn>
        </Link>
        <Btn
          onClick={() => {
            signOut(auth);
            window.alert("로그아웃되었습니다.");
            navigate("/");
          }}
        >
          로그아웃
        </Btn>
      </Header>
      <h1>알림</h1>
    </>
  );
};
const Header = styled.header`
  ${PageHeader};
`;

const HomeBtn = styled(ImHome3)`
  width: 45px;
  height: 45px;
  position: absolute;
  top: 10px;
  left: 10px;
  color: tan;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s ease-in-out;

  &:hover {
    color: saddlebrown;
  }
  &:active {
    color: darkslategray;
  }
`;

const Btn = styled.div`
  ${ShortBtn};
`;

export default Alert;
