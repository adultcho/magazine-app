import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

//firebase
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";

//style
import { ShortBtn, LongBtn, PageHeader } from "./bundle";
import { ImHome3 } from "react-icons/im";

const SignIn = () => {
  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const signInFirebase = async () => {
    //벨리데이션
    if ((id_ref.current.value || pw_ref.current.value) === "") {
      return false;
    }
    console.log(id_ref.current.value, pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_docs = await getDocs(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );

    user_docs.forEach((u) => {
      console.log(u.data());
    });
    window.alert('로그인 성공.')
    navigate("/");
  };

  return (
    <>
      <Header>
        <Link to="/">
          <HomeBtn>홈</HomeBtn>
        </Link>
        <MoveBtn to="/sign-up_page">회원가입</MoveBtn>
      </Header>
      <div>
        <h1>로그인</h1>
        아이디
        <InputBox
          type="text"
          placeholder="아이디를 입력하세요"
          ref={id_ref}
          required
        />
        비밀번호
        <InputBox placeholder="비밀번호를 입력하세요" ref={pw_ref} required />
        <DoneBtn onClick={signInFirebase}>로그인 하기</DoneBtn>
      </div>
    </>
  );
};
export default SignIn;

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

const MoveBtn = styled(Link)`
  ${ShortBtn};
`;

const DoneBtn = styled.button`
  ${LongBtn};
`;

const InputBox = styled.input`
  display: block;
  min-width: 400px;
  height: 50px;
  margin: 15px 0;
`;
