import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UserProvider from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import NewPost from "./pages/NewPost";

export default function App(){
    return (
        <PagesContainer>
          
          <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/new-post" element={<NewPost />} />
            </Routes>
            </UserProvider>
          </BrowserRouter>
        </PagesContainer>
      )
}

const PagesContainer = styled.main`
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`