import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UserProvider from "./contexts/UserContext";

export default function App(){
    return (
        <PagesContainer>
          
          <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
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