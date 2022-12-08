import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "./Header.js";
import Cookies from "universal-cookie";
import { LoginContext } from "./LoginContext.js";
const cookies = new Cookies();

export default function Player() {
  const url = "https://nfl-app.adaptable.app/api/players/";
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
        if (response.data.type === "disambiguation") {
          disambiguationFetch(playerInfo.position);
        } else {
          setPlayerBio(response.data.extract);
          setPlayerImage(response.data.originalimage.source);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    function disambiguationFetch(position) {
      if (position) {
        axios
          .get(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${
              playerInfo.name
            } (${position.toLowerCase()})`
          )
          .then((response) => {
            setPlayerBio(response.data.extract);
            setPlayerImage(response.data.originalimage.source);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
          <div className>
            <div className="flex flex-col justify-center items-center min-h-screen">
              <Header />
              <div className="text-3xl p-2 h-[80px] underline text-indigo-400">
                Player Profile
              </div>
              <div className="flex justify-center items-center flex-wrap w-3/4">
                <div className="flex justify-center items-center flex-col w-[300px] min-h-[400px] border border-solid border-indigo-500 rounded-lg">
                  {playerInfo ? (
                    <div className="">
                      {input ? (
                        <>
                          <div className="flex flex-col p-2 items-center">
                            <div className="flex flex-col">
                              <label>Name: </label>
                              <input
                                className="pl-1 border border-black border-solid w-max"
                                value={tempPlayer.name}
                                onChange={(e) => {
                                  setTempPlayer({
                                    ...tempPlayer,
                                    name: e.target.value,
                                  });
                                  setChange(true);
                                }}
                              />
                            </div>
                            <div>
                              <label className="flex flex-col">
                                Position:{" "}
                              </label>
                              <input
                                className="pl-1 border border-black border-solid w-max"
                                value={tempPlayer.position}
                                onChange={(e) => {
                                  setTempPlayer({
                                    ...tempPlayer,
                                    position: e.target.value,
                                  });
                                  setChange(true);
                                }}
                              />
                            </div>
                            <div>
                              <label className="flex flex-col">Team: </label>
                              <input
                                className="pl-1 border border-black border-solid w-max"
                                value={tempPlayer.team}
                                onChange={(e) => {
                                  setTempPlayer({
                                    ...tempPlayer,
                                    team: e.target.value,
                                  });
                                  setChange(true);
                                }}
                              />
                            </div>
                            <div>
                              <label className="flex flex-col">Age: </label>
                              <input
                                className="pl-1 border border-black border-solid w-max"
                                value={tempPlayer.age}
                                onChange={(e) => {
                                  setTempPlayer({
                                    ...tempPlayer,
                                    age: e.target.value,
                                  });
                                  setChange(true);
                                }}
                              />
                            </div>
                            <div className="flex justify-center items-center mt-3">
                              <button
                                className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                                onClick={handlePlayerSave}
                              >
                                Save
                              </button>

                              <button
                                className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                                onClick={handlePlayerCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="m-3 text-md justify-center items-center text-center p-4">
                            <div className="m-1 p-2">
                              Name:
                              <div className="font-bold">{playerInfo.name}</div>
                            </div>
                            <div className="m-1 p-2">
                              Position:
                              <div className="font-bold">
                                {playerInfo.position}
                              </div>
                            </div>
                            <div className="m-1 p-2">
                              Team:
                              <div className="font-bold">{playerInfo.team}</div>
                            </div>
                            <div className="m-1 p-2">
                              Age:
                              <div className="font-bold">{playerInfo.age}</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : null}
                  <div className="m-2 flex items-center">
                    <button
                      className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                      onClick={() => {
                        setInput(true);
                      }}
                    >
                      {" "}
                      Edit
                    </button>

                    <button
                      className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                      onClick={handlePlayerDelete}
                    >
                      Delete
                    </button>
                  </div>
                  {errorMsg ? <div>{errorMsg}, admin only</div> : null}
                </div>
                <div className="flex flex-wrap justify-center">
                  {playerImage ? (
                    <div className="m-4 h-[400px] w-[300px] flex justify-center items-center">
                      <img
                        alt={`${playerInfo.name}`}
                        className="h-[400px] rounded-xl "
                        src={playerImage}
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  {playerBio ? (
                    <>
                      <div className="text-sm rounded-xl w-[300px] min-h-[400px] flex flex-col justify-center items-center p-3 bg-slate-100 border border-solid border-indigo-500">
                        <div>
                          <div className="p-2 flex justify-center items-center">
                            About
                          </div>
                          <div className="text-center">{playerBio}</div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <button
                className="bg-white text-slate-400 m-3 w-[120px] border border-solid border-slate-500 rounded-md hover:bg-slate-500 hover:text-white duration-500 text-sm p-1"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to playerlist
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
