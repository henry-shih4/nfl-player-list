import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ShowPlayerList from "./ShowPlayerList.js";
import AddPlayer from "./AddPlayer";
import Player from "./Player";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import { LoginProvider } from "./LoginContext.js";

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ShowPlayerList />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/add-player" element={<AddPlayer />} />
            <Route exact path="/player/:id" element={<Player />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;
