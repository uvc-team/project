import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyPage from './myPage';
import Home from './Home';
import Login from './login';
import Logout from './MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/MainPage' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;