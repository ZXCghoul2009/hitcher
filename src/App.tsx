import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import {MainPage} from "./components/pages/MainPage/MainPage";
import {LoginPage} from "./components/pages/AuthPage/LoginPage";
import Header from "./components/Header/Header";
import {TripPage} from "./components/pages/TripPage/TripPage";
import {SignUpPage} from "./components/pages/AuthPage/SignUpPage";
import {VerificationEmailPage} from "./components/pages/VerificationEmailPage/VerificationEmailPage";
import {SearchTripPage} from "./components/pages/SearchTripPage/SearchTripPage";
import { ReactKeycloakProvider} from "@react-keycloak/web";
import {kc} from "./utils/service/UserService";
import {CreateTripPage} from "./components/pages/CreateTripPage/CreateTripPage";


function App() {
  return (
      <ReactKeycloakProvider authClient={kc}>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<MainPage/>} />
                  <Route path="/search" element={<SearchTripPage/>} />
                  <Route path="/auth" element={<LoginPage/>} />
                  <Route path="/signUp" element={<SignUpPage/>} />
                  <Route path="/:id" element={<TripPage/>} />
                <Route path="/create-trip" element={<CreateTripPage/>} />
                <Route path="/confirmMail" element={<VerificationEmailPage/>} />
              </Routes>
          </BrowserRouter>
      </ReactKeycloakProvider>

  );
}

export default App;
