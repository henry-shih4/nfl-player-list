import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AddPlayer() {
  const url = "https://nfl-app.adaptable.app/api/players/";
  const [newPlayerName, setNewPlayerName] = useState();
  const [newPlayerPosition, setNewPlayerPosition] = useState();
  const [newPlayerTeam, setNewPlayerTeam] = useState();
  const [newPlayerAge, setNewPlayerAge] = useState();
  const [newPlayerInfo, setNewPlayerInfo] = useState();
  const [addedPlayerName, setAddedPlayerName] = useState();
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [isLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const token = cookies.get("TOKEN");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  useEffect(() => {
    setNewPlayerInfo({
      name: newPlayerName,
      position: newPlayerPosition,
      team: newPlayerTeam,
      age: newPlayerAge,
    });
  }, [newPlayerName, newPlayerPosition, newPlayerTeam, newPlayerAge]);

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post(url, newPlayerInfo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessage(response.data.msg);
        setNewPlayerInfo([]);
        setNewPlayerName("");
        setNewPlayerPosition("");
        setNewPlayerTeam("");
        setNewPlayerAge("");
        setModal(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.statusText);
        console.log(error.message);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        {isLoggedIn ? (
          <>
            <form
              className="p-2 flex flex-col justify-center items-center w-1/2"
              onSubmit={handleFormSubmit}
            >
              <div className="p-2 flex flex-col">
                <label for="name">Name: </label>
                <input
                  required
                  className="pl-2 border border-solid border-indigo-500"
                  type="text"
                  id="name"
                  name="name"
                  value={newPlayerName}
                  onChange={(e) => {
                    setNewPlayerName(e.target.value);
                    setAddedPlayerName(e.target.value);
                  }}
                />
              </div>
              <div className="p-2 flex flex-col">
                <label for="position">Position: </label>
                <input
                  className="pl-2 border border-solid border-indigo-500"
                  type="text"
                  id="position"
                  name="position"
                  value={newPlayerPosition}
                  onChange={(e) => setNewPlayerPosition(e.target.value)}
                />
              </div>
              <div className="p-2 flex flex-col">
                <label for="team">Team: </label>
                <input
                  className="pl-2 border border-solid border-indigo-500"
                  type="text"
                  id="team"
                  name="team"
                  value={newPlayerTeam}
                  onChange={(e) => setNewPlayerTeam(e.target.value)}
                />
              </div>
              <div className="p-2 flex flex-col">
                <label for="age">Age: </label>
                <input
                  className="pl-2 border border-solid border-indigo-500"
                  type="text"
                  id="age"
                  name="age"
                  value={newPlayerAge}
                  onChange={(e) => setNewPlayerAge(e.target.value)}
                />
              </div>
              <div>
                {message && modal ? (
                  <>
                    <div className="absolute top-0 left-0 w-screen h-screen bg-slate-400 opacity-75">
                      <div className="flex flex-col justify-center items-center h-full bg-slate-200">
                        {message + " " + addedPlayerName}
                        <button
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div>
                <button
                  className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                  type="submit"
                >
                  Add Player
                </button>
                <button
                  className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1"
                  type="reset"
                  onClick={() => {
                    setNewPlayerName("");
                    setNewPlayerPosition("");
                    setNewPlayerAge("");
                    setNewPlayerAge("");
                  }}
                >
                  reset
                </button>
              </div>
              {errorMsg ? <div>{errorMsg}</div> : null}
            </form>
            <button
              className="bg-white text-slate-400 m-3 w-[120px] border border-solid border-slate-500 rounded-md hover:bg-slate-500 hover:text-white duration-500 text-sm p-1"
              onClick={() => {
                navigate("/");
              }}
            >
              Go to Players
            </button>
          </>
        ) : (
          <>
            <div>Please log in to view this page.</div>
            <div>
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
