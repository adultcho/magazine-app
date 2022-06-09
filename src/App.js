import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";

// components
import Main from "./Main";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Post from "./Post";
import Alert from "./Alert";
import MyProfile from "./MyProfile";

//firebase
import { auth, db } from "./shared/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// style
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";


function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <GlobalStyles />
        <Container>
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/sign-in_page" exact element={<SignIn />} />
            <Route path="/sign-up_page" exact element={<SignUp />} />
            <Route path="/post_page" exact element={<Post />} />
            <Route path="/alert_page" exact element={<Alert />} />
            <Route path="/profile_page" exact element={<MyProfile />} />
          </Routes>
        </Container>
      </Page>
    </ThemeProvider>
  );
}

const Page = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: floralwhite;
  width: 35vw;
  min-width: 500px;
  height: 100vh;
  box-shadow: 0px 0px 5px 0px gray;
`;

export default App;
