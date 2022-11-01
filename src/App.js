import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";
import ShowPlayerList from "./ShowPlayerList.js";
import AddPlayer from "./AddPlayer";
import Player from "./Player";
import Login from "./Login";
import Register from "./Register";
import { LoginProvider } from "./LoginContext.js";

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowPlayerList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-player" element={<AddPlayer />} />
            <Route path="/player/:id" element={<Player />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;
