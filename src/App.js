import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ShowPlayerList from "./ShowPlayerList.js";
import AddPlayer from "./AddPlayer";
import Player from "./Player";
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
          <Route path="/" element={<ShowPlayerList />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
