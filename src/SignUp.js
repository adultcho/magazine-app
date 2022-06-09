import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

//style
import { ShortBtn, LongBtn, PageHeader } from "./bundle";
import { ImHome3 } from "react-icons/im";

const SignUp = () => {
  const navigate = useNavigate();
  
  const id_ref = React.useRef(null);
  const nickname_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const signUpFirebase = async (e) => {
    e.preventDefault();
    //벨리데이션
    if (
      (id_ref.current.value ||
        nickname_ref.current.value ||
        pw_ref.current.value) === ""
    ) {
      return false;
    }

    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      nickname: nickname_ref.current.value,
    });
    console.log(user_doc.id);
    window.alert("회원가입 완료.");
    navigate("/sign-in_page");
  };

  return (
    <>
      <Header>
        <Link to="/">
          <HomeBtn>홈</HomeBtn>
        </Link>
        <MoveBtn to="/sign-in_page">로그인</MoveBtn>
      </Header>
      <h1>회원가입</h1>
      <form onSubmit={signUpFirebase}>
        아이디
        <InputBox type="text" placeholder="아이디를 입력하세요" ref={id_ref} />
        닉네임
        <InputBox
          type="text"
          placeholder="닉네임을 입력하세요"
          ref={nickname_ref}
        />
        비밀번호
        <InputBox placeholder="비밀번호를 입력하세요" ref={pw_ref} />
        비밀번호 확인
        <InputBox placeholder="비밀번호를 한번 더 입력하세요" />
        <DoneBtn type="submit">회원가입 하기</DoneBtn>
      </form>
    </>
  );
};
export default SignUp;

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
