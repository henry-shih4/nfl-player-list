import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ShowPlayerList from "./ShowPlayerList.js";
import AddPlayer from "./AddPlayer";
import Player from "./Player";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowPlayerList />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
