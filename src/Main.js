import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//firebase
import { auth, db } from "./shared/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

//style
import { RiAddCircleFill } from "react-icons/ri";
import { ShortBtn, PageHeader } from "./bundle";
import { ImHome3 } from "react-icons/im";
import { CgProfile } from "react-icons/cg";

const Main = () => {
  const [is_signIn, setIsSignin] = React.useState(false);
  // console.log(auth.currentUser);
  const signInCheck = async (user) => {
    if (user) {
      setIsSignin(true);
    } else {
      setIsSignin(false);
    }
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, signInCheck);
  }, []);
  return (
    <>
      {is_signIn ? (
        <>
          <Header>
            <Link to='/profile_page'>
            <MyBtn/>
            </Link>
            <MoveBtn className="alert_btn" to="/alert_page">
              알림
              <AlertIcon className="alert_icon">3</AlertIcon>
            </MoveBtn>
            <Btn
              onClick={() => {
                signOut(auth);
                window.alert("로그아웃되었습니다.");
              }}
            >
              로그아웃
            </Btn>
          </Header>
          <Link to="/post_page">
            <AddBtn />
          </Link>
        </>
      ) : (
        <>
        <Header>
          <Link to="/">
            <HomeBtn>홈</HomeBtn>
          </Link>
          <MoveBtn to="/sign-up_page">회원가입</MoveBtn>
          <MoveBtn to="/sign-in_page">로그인</MoveBtn>
        </Header>
        <Link to="/post_page">
            <AddBtn />
          </Link>
        </>
      )}
    </>
  );
};

const Header = styled.header`
  ${PageHeader};
`;

const Btn = styled.div`
  ${ShortBtn};
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
const MyBtn = styled(CgProfile)`
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
const MoveBtn = styled(Link)`
  ${ShortBtn};
  position: relative;
  .alert_icon {
    transition: all 0.5s ease-in-out;
  }
  .alert_btn&:hover .alert_icon {
    background-color: mediumvioletred;
    transform: rotateY(360deg);
  }
`;
const AddBtn = styled(RiAddCircleFill)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 70px;
  height: 70px;
  color: indianred;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s ease-in-out;

  &:hover {
    transform: rotateZ(180deg);
    color: saddlebrown;
  }
  &:active {
    color: darkslategray;
  }
`;
const AlertIcon = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -7px;
  top: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: plum;
  color: snow;
  font-weight: bold;
  font-size: 15px;
`;

export default Main;
