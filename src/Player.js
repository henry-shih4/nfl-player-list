import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Player() {
  const url = "https://nfl-players-server.herokuapp.com/api/players/";
  const params = useParams();
  const [playerInfo, setPlayerInfo] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState(false);
  const [tempPlayer, setTempPlayer] = useState();
  const [change, setChange] = useState(false);
  const [updated, setUpdated] = useState(false);
  const token = cookies.get("TOKEN");

  // useEffect(() => {
  //   console.log(tempPlayer);
  //   console.log(updated);
  // });

  useEffect(() => {
    axios
      .get(url + params.id, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
      .delete(url + params.id)
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
        .put(url + params.id, tempPlayer)
        .then((res) => {
          console.log(res.data.msg);
          navigate(`/player/${params.id}`);
          setUpdated(!updated);
        })
        .catch((err) => {
          console.log("Error with updating player info!");
        });
      setInput(false);
      setChange(false);
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
                <div className="flex items-center">
                  <button
                    className="w-[60px] m-2 p-1 border-black border-2 border-solid rounded-md"
                    onClick={handlePlayerSave}
                  >
                    save
                  </button>

                  <button
                    className="w-[60px] m-2 p-1 border-black border-2 border-solid rounded-md"
                    onClick={handlePlayerCancel}
                  >
                    cancel
                  </button>
                </div>
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
      <div className="m-2 flex items-center">
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
          className="w-[60px] p-1 m-2 border-black border-2 border-solid rounded-md"
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
