import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Menu } from './components/Menu'
import { Home } from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
