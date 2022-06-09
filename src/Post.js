import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

//firebase
import { auth, db, storage } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

//redux

//style
import { ShortBtn, LongBtn, PageHeader } from "./bundle";
import { ImHome3 } from "react-icons/im";

const Post = () => {
  const navigate = useNavigate();

  // const file_link_ref = React.useRef(null);

  // const uploadFirebase = async (e) => {
  //   console.log(e.target.files);
  //   const uploaded_file = await uploadBytes(
  //     ref(storage, `images/${e.target.files[0].name}`),
  //     e.target.files[0]
  //     );
  //     console.log(uploaded_file);

  //     const file_url = await getDownloadURL(uploaded_file.ref);

  //     console.log(file_url);
  //     file_link_ref.current = {url: file_url};

  //     const user_doc = await addDoc(collection(db, "users"), {
  //       upload_image: file_link_ref.current.url,
  //     });
  // };
  const [is_signIn, setIsSignin] = React.useState(false);

  const [files, setFiles] = React.useState("");
  const [fileName, setFileName] = React.useState("");
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

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
    setFileName(e.target.value);
    console.log(file);
  };

  useEffect(() => {
    preview();
    return () => preview();
  });

  const preview = () => {
    
    if (!files) return false;
    const imgEL = document.querySelector(".img_box");
    const reader = new FileReader();
    reader.onload = () =>
      (imgEL.style.backgroundImage = `url(${reader.result})`);

    reader.readAsDataURL(files[0]);
  };

  if (!is_signIn) {
    return (
      <>
        <Header>
          <Link to="/">
            <HomeBtn>홈</HomeBtn>
          </Link>
        </Header>
        <div>
          <h1>죄송합니다.</h1>

          <h2>로그인 후 이용해 주세요.</h2>
          <DoneBtn
            onClick={() => {
              navigate("/sign-in_page");
            }}
          >
            로그인 화면으로 이동
          </DoneBtn>
          <h2>아직 회원가입을 안하셨나요?</h2>
          <DoneBtn
            onClick={() => {
              navigate("/sign-up_page");
            }}
          >
            회원가입 화면으로 이동
          </DoneBtn>
        </div>
      </>
    );
  }

  return (
    <>
      <Header>
        <Link to="/">
          <HomeBtn>홈</HomeBtn>
        </Link>
        <MoveBtn className="alert_btn" to="/alert_page">
          알림
          <AlertIcon className="alert_icon">3</AlertIcon>
        </MoveBtn>
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
      <form>
        <h1>게시글 작성</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <input
            type="text"
            htmlFor="input-file"
            placeholder="이미지를 선택하세요"
            value={fileName.split("\\")[2] || ""}
            style={{
              border: "2px solid pink",
              borderRadius: "10px",
            }}
            disabled
          />
          <LabelBtn htmlFor="input-file">파일 선택</LabelBtn>
          <input
            type="file"
            id="input-file"
            accept="img/*"
            onChange={onLoadFile}
            style={{ display: "none" }}
          />
        </div>
        <div
          className="img_box"
          style={{
            width: "inherit",
            height: "400px",
            backgroundSize: "cover",
            borderRadius: "20px",
            marginBottom: "15px",
            backgroundColor: '#ddd'
          }}
        ></div>
        <h2>내용</h2>
        <InputBox type='text' placeholder="게시글을 입력해 주세요." />

        <DoneBtn type="submit">게시글 작성</DoneBtn>
      </form>
    </>
  );
};

const Header = styled.header`
  ${PageHeader};
`;
const Btn = styled.div`
  ${ShortBtn};
`;

const DoneBtn = styled.button`
  ${LongBtn};
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
  position: relative;
  .alert_icon {
    transition: all 0.5s ease-in-out;
  }
  .alert_btn&:hover .alert_icon {
    background-color: mediumvioletred;
    transform: rotateY(360deg);
  }
`;
const LabelBtn = styled.label`
  ${ShortBtn};
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
const InputBox = styled.input`
  display: block;
  min-width: 400px;
  height: 50px;
  margin: 15px 0;
`;
export default Post;
