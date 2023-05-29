import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UserProvider from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import NewPost from "./pages/NewPost";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import UsersProfile from "./pages/UsersProfile";

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
              <Route path="/followers" element={<FollowersPage />} />
              <Route path="/following" element={<FollowingPage />} />
              <Route path="/posts/:id" element={<UsersProfile />} />
              

            </Routes>
            </UserProvider>
          </BrowserRouter>
        </PagesContainer>
      )
}

const PagesContainer = styled.main`
  width: 100%;
  max-height: 100vh;
`