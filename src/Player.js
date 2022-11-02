import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { LoginContext } from "./LoginContext.js";
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
  const [isLoggedIn] = useContext(LoginContext);
  const [errorMsg, setErrorMsg] = useState();
  const [playerBio, setPlayerBio] = useState();
  const [playerImage, setPlayerImage] = useState();

  const token = cookies.get("TOKEN");

  //resets error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  useEffect(() => {
    axios
      .get(url + params.id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPlayerInfo(response.data);
        setTempPlayer(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        navigate("/login");
      });
  }, [params.id, updated, token, navigate]);

  useEffect(() => {
    axios
      .get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${playerInfo.name}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.type === "disambiguation") {
          disambiguationFetch();
        }
        setPlayerBio(response.data.extract);
        setPlayerImage(response.data.originalimage.source);
      })
      .catch((error) => {
        console.log(error);
      });

    function disambiguationFetch() {
      axios
        .get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${
            playerInfo.name
          } (${playerInfo.position.toLowerCase()})`
        )
        .then((response) => {
          console.log(response);
          setPlayerBio(response.data.extract);
          setPlayerImage(response.data.originalimage.source);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [playerInfo.name, playerInfo.position]);

  function handlePlayerDelete() {
    axios
      .delete(url + params.id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.msg);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.response.statusText);
        console.log(error);
      });
  }

  function handlePlayerSave() {
    if (change) {
      axios
        .put(url + params.id, tempPlayer, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          navigate(`/player/${params.id}`);
          setUpdated(!updated);
        })
        .catch((error) => {
          setErrorMsg(error.response.statusText);
          setTempPlayer({ ...playerInfo });
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
      {isLoggedIn ? (
        <>
          <div className="flex justify-center items-center flex-wrap h-screen">
            <div className="flex justify-center items-center flex-col">
              <div>Player Profile</div>
              {playerInfo ? (
                <div className="">
                  {input ? (
                    <>
                      <div className="flex flex-col p-2">
                        <label>Name: </label>
                        <input
                          className="border-2 border-black border-solid w-max"
                          value={tempPlayer.name}
                          onChange={(e) => {
                            setTempPlayer({
                              ...tempPlayer,
                              name: e.target.value,
                            });
                            setChange(true);
                          }}
                        />

                        <label>Position: </label>
                        <input
                          className="border-2 border-black border-solid w-max"
                          value={tempPlayer.position}
                          onChange={(e) => {
                            setTempPlayer({
                              ...tempPlayer,
                              position: e.target.value,
                            });
                            setChange(true);
                          }}
                        />

                        <label>Team: </label>
                        <input
                          className="border-2 border-black border-solid w-max"
                          value={tempPlayer.team}
                          onChange={(e) => {
                            setTempPlayer({
                              ...tempPlayer,
                              team: e.target.value,
                            });
                            setChange(true);
                          }}
                        />

                        <label>Age: </label>
                        <input
                          className="border-2 border-black border-solid w-max"
                          value={tempPlayer.age}
                          onChange={(e) => {
                            setTempPlayer({
                              ...tempPlayer,
                              age: e.target.value,
                            });
                            setChange(true);
                          }}
                        />
                        <div className="flex justify-center items-center mt-3">
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
                      <div className="m-3 text-md">
                        <div className="m-1 p-2">Name: {playerInfo.name}</div>
                        <div className="m-1 p-2">
                          Position: {playerInfo.position}
                        </div>
                        <div className="m-1 p-2">Team: {playerInfo.team}</div>
                        <div className="m-1 p-2">Age: {playerInfo.age}</div>
                      </div>
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
              {errorMsg ? <div>{errorMsg}</div> : null}
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                back to players
              </button>
            </div>
            <div className="flex flex-wrap justify-center pt-4">
              {playerImage ? (
                <div className="h-[400px] w-[300px] flex justify-center ">
                  <img
                    alt={`${playerInfo.name}`}
                    className="max-h-[400px] m-3 rounded-xl bg-red-300"
                    src={playerImage}
                  />
                </div>
              ) : null}
              {playerBio ? (
                <div
                  className="w-[400px] flex justify-center items-center p-3"
                  bg-red-300
                >
                  {playerBio}
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
