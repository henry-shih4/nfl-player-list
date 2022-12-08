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
      .get("https://nfl-app.adaptable.app/api/players", {
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
            <div className="flex justify-between items-center text-white w-full bg-[#121420]">
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
            <div className="bg-slate-200 flex justify-start items-center flex-col min-h-full pt-5">
              <div className="text-3xl m-2 flex justify-center items-center text-indigo-700">
                Our Partnered NFL Players
              </div>
              <div className="flex flex-wrap justify-center w-3/4">
                {playerList
                  ? playerList.map((player) => {
                      return (
                        <div
                          key={player._id}
                          onClick={() => {
                            navigate(`/player/${player._id}`);
                          }}
                          className="h-[120px] w-[120px] bg-indigo-200 m-2 p-2 flex justify-center items-center text-center rounded-lg border border-solid border-slate-400 hover:scale-110 duration-300"
                        >
                          {player.name}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-white text-indigo-600 mt-3 w-[100px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                  onClick={() => {
                    navigate("/add-player");
                  }}
                >
                  Add a player
                </button>
              </div>
              <div>
                <button
                  className="bg-white text-indigo-600 mt-3 w-[100px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  Admin Page
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
