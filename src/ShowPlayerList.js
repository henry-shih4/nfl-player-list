import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ShowPlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, changeLoggedIn, , activeUser] = useContext(LoginContext);
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
        changeLoggedIn(false);
        navigate("/login");
      });
  }, [token, navigate, changeLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <>
          {activeUser ? (
            <div className="flex justify-between items-center absolute top-0 left-0 text-white w-full bg-[#121420]">
              <div className="ml-3">Welcome, {activeUser}!</div>
              <button
                className="p-2 m-2 rounded-md hover:bg-white hover:text-[#121420] text-white duration-500"
                onClick={() => {
                  cookies.remove("TOKEN", { path: "/" });
                  changeLoggedIn(false);
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          ) : null}
          <div className="h-screen justify-center items-center">
            <div className="bg-indigo-200 flex justify-center items-center flex-col min-h-full">
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
