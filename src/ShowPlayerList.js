import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ShowPlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const token = cookies.get("TOKEN");

  useEffect(() => {
    axios
      .get("https://nfl-players-server.herokuapp.com/api/players", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPlayerList(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoggedIn(false);
        navigate("/login");
      });
  }, [token, navigate, setIsLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="flex justify-center items-center flex-col h-screen">
            <div className="m-2 flex justify-center items-center">
              Player List
            </div>
            <div className="flex flex-wrap justify-center">
              {playerList
                ? playerList.map((player) => {
                    return (
                      <div
                        key={player._id}
                        onClick={() => {
                          navigate(`/player/${player._id}`);
                        }}
                        className="h-[100px] w-[100px] bg-blue-300 m-2 p-1 flex justify-center items-center text-center rounded-full"
                      >
                        {player.name}
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="flex justify-center">
              <button
                className="flex justify-center w-[100px]"
                onClick={() => {
                  navigate("/add-player");
                }}
              >
                Add a player
              </button>
            </div>
            <div>
              <button
                className="absolute top-0 right-3 border-black border-solid border-2 p-1 m-1 hover:bg-blue-300"
                onClick={() => {
                  cookies.remove("TOKEN", { path: "/" });
                  setIsLoggedIn(false);
                  navigate("/login");
                }}
              >
                Logout
              </button>
              <button
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Admin Only
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
