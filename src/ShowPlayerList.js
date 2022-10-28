import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShowPlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(playerList);
  // });

  useEffect(() => {
    axios
      .get("https://nfl-players-server.herokuapp.com/api/players")
      .then((response) => {
        // console.log(response);
        setPlayerList(response.data);
      })
      .catch((error) => {
        console.log(error);
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
    </>
  );
}
