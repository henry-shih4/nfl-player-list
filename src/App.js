import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import ShowPlayerList from "./ShowPlayerList.js";
import AddPlayer from "./AddPlayer";
import Player from "./Player";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [token, setToken] = useState();


  function handleToken(authToken) {
    setToken(authToken);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login handleToken={handleToken} />} />
          <Route path="/" element={<ShowPlayerList token={token} />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
