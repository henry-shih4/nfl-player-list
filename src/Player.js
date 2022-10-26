import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Player() {
  const params = useParams();
  const [playerInfo, setPlayerInfo] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState(false);
  const [tempPlayer, setTempPlayer] = useState();

  useEffect(() => {
    console.log(tempPlayer);
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/players/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setPlayerInfo(response.data);
        setTempPlayer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  function handlePlayerDelete() {
    axios
      .delete("http://localhost:8082/api/players/" + params.id)
      .then((res) => {
        console.log(res.data.msg);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePlayerSave() {
    console.log("update player");
  }

  return (
    <>
      <div>Player</div>
      {playerInfo ? (
        <div
          onMouseDown={() => {
            setInput(true);
          }}
          onMouseLeave={() => {
            setInput(false);
          }}
        >
          {input ? (
            <>
              <label>Name: </label>
              <input
                value={tempPlayer.name}
                onChange={(e) => {
                  setTempPlayer({ ...tempPlayer, name: e.target.value });
                }}
              />
            </>
          ) : (
            <div>Name: {playerInfo.name}</div>
          )}

          <div>Position: {playerInfo.position}</div>
          <div>Team: {playerInfo.team}</div>
          <div>Age: {playerInfo.age}</div>
        </div>
      ) : null}
      <button
        onClick={() => {
          setInput(true);
        }}
      >
        {" "}
        update
      </button>
      <button onClick={handlePlayerSave}>save changes</button>
      <button onClick={handlePlayerSave}>cancel</button>
      <button onClick={handlePlayerDelete}>delete player</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        back to players
      </button>
    </>
  );
}
