import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import {MainPage} from "./components/pages/MainPage/MainPage";
import Header from "./components/Header/Header";


function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<MainPage/>} />
              </Routes>

          </BrowserRouter>
      </>

  );
}

export default App;
