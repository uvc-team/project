import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyPage from './myPage';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/myPage' element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;