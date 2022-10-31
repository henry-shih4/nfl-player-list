import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ShowPlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();
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
      });
  }, []);

  return (
    <>
      <div className="m-2">Players</div>
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
          onClick={() => {
            navigate("/login");
          }}
        >
          Login to view
        </button>
        <button
          onClick={() => {
            cookies.remove("TOKEN", { path: "/" });
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
