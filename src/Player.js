import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Player() {
  const params = useParams();
  const [playerInfo, setPlayerInfo] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState(false);
  const [tempPlayer, setTempPlayer] = useState();
  const [change, setChange] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    console.log(tempPlayer);
    console.log(change);
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
  }, [params.id, updated]);

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
    if (change) {
      axios
        .put("http://localhost:8082/api/players/" + params.id, tempPlayer)
        .then((res) => {
          console.log(res.data.msg);
          navigate(`/player/${params.id}`);
        })
        .catch((err) => {
          console.log("Error in UpdateBookInfo!");
        });
      setInput(false);
      setChange(false);
      setUpdated(!updated);
    } else {
      console.log("no changes");
    }
  }

  function handlePlayerCancel() {
    setTempPlayer({ ...playerInfo });
    setChange(false);
    setInput(false);
  }

  return (
    <>
      <div>Player</div>
      {playerInfo ? (
        <div>
          {input ? (
            <>
              <div className="flex flex-col p-2">
                <label>Name: </label>
                <input
                  className="border-2 border-black border-solid w-1/4"
                  value={tempPlayer.name}
                  onChange={(e) => {
                    setTempPlayer({ ...tempPlayer, name: e.target.value });
                    setChange(true);
                  }}
                />

                <label>Position: </label>
                <input
                  className="border-2 border-black border-solid w-1/4"
                  value={tempPlayer.position}
                  onChange={(e) => {
                    setTempPlayer({ ...tempPlayer, position: e.target.value });
                    setChange(true);
                  }}
                />

                <label>Team: </label>
                <input
                  className="border-2 border-black border-solid w-1/4"
                  value={tempPlayer.team}
                  onChange={(e) => {
                    setTempPlayer({ ...tempPlayer, team: e.target.value });
                    setChange(true);
                  }}
                />

                <label>Age: </label>
                <input
                  className="border-2 border-black border-solid w-1/4"
                  value={tempPlayer.age}
                  onChange={(e) => {
                    setTempPlayer({ ...tempPlayer, age: e.target.value });
                    setChange(true);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div>Name: {playerInfo.name}</div>
              <div>Position: {playerInfo.position}</div>
              <div>Team: {playerInfo.team}</div>
              <div>Age: {playerInfo.age}</div>
            </>
          )}
        </div>
      ) : null}
      <div>
        <button
          className="w-[60px] m-2 p-1 border-black border-2 border-solid rounded-md"
          onClick={() => {
            setInput(true);
          }}
        >
          {" "}
          edit
        </button>
        <button
          className="w-[60px] p-1 border-black border-2 border-solid rounded-md"
          onClick={handlePlayerSave}
        >
          save
        </button>
      </div>
      <div>
        <button
          className="w-[60px] m-2 p-1 border-black border-2 border-solid rounded-md"
          onClick={handlePlayerCancel}
        >
          cancel
        </button>
        <button
          className="w-[60px] p-1 border-black border-2 border-solid rounded-md"
          onClick={handlePlayerDelete}
        >
          delete
        </button>
      </div>
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
