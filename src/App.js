import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ShowPlayerList from "./ShowPlayerList.js";
import AddPlayer from "./AddPlayer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowPlayerList />} />
          <Route path="/add-player" element={<AddPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
