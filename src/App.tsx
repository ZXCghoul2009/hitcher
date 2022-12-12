import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import {MainPage} from "./components/pages/MainPage/MainPage";
import {LoginPage} from "./components/pages/AuthPage/LoginPage";
import Header from "./components/Header/Header";



function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<MainPage/>} />
                  <Route path="auth" element={<LoginPage/>} />
              </Routes>

          </BrowserRouter>
      </>

  );
}

export default App;
