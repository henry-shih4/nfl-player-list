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
      .get("http://localhost:8082/api/players")
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
      {playerList
        ? playerList.map((player) => {
            return (
              <div
                onClick={() => {
                  navigate(`/player/${player._id}`);
                }}
                className=""
              >
                {player.name}
              </div>
            );
          })
        : null}
      <button
        onClick={() => {
          navigate("/add-player");
        }}
      >
        Add a player
      </button>
    </>
  );
}
