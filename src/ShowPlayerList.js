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
          <div className="h-screen justify-center items-center">
            <div className="bg-[#121420] flex justify-center items-center flex-col min-h-full">
              <div className="m-2 flex justify-center items-center text-white">
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
                          className="h-[100px] w-[100px] bg-white m-2 p-1 flex justify-center items-center text-center rounded-full"
                        >
                          {player.name}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="flex justify-center">
                <button
                  className="text-white flex justify-center w-[100px]"
                  onClick={() => {
                    navigate("/add-player");
                  }}
                >
                  Add a player
                </button>
              </div>
              <div>
                <button
                  className="absolute top-0 right-3 border-white border-solid border-2 p-1 m-1 hover:bg-white hover:text-[#121420] text-white"
                  onClick={() => {
                    cookies.remove("TOKEN", { path: "/" });
                    setIsLoggedIn(false);
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
                <button
                  className="text-white"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  Admin Only
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
