import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPlayer() {
  const [newPlayerName, setNewPlayerName] = useState();
  const [newPlayerPosition, setNewPlayerPosition] = useState();
  const [newPlayerTeam, setNewPlayerTeam] = useState();
  const [newPlayerAge, setNewPlayerAge] = useState();
  const [newPlayerInfo, setNewPlayerInfo] = useState();
  const [addedPlayerName, setAddedPlayerName] = useState();
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(addedPlayerName);
  });

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
      .post("http://localhost:8082/api/players", newPlayerInfo)
      .then((response) => {
        setMessage(response.data.msg);
        setNewPlayerInfo([]);
        setNewPlayerName("");
        setNewPlayerPosition("");
        setNewPlayerTeam("");
        setNewPlayerAge("");
        setModal(true);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <form
        className="p-2 flex flex-col justify-center items-center w-1/2"
        onSubmit={handleFormSubmit}
      >
        <div className="p-2 flex flex-col">
          <label for="name">Name: </label>
          <input
            required
            className="pl-2 border-2 border-solid border-blue-300"
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
            className="pl-2 border-2 border-solid border-blue-300"
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
            className="pl-2 border-2 border-solid border-blue-300"
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
            className="pl-2 border-2 border-solid border-blue-300"
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
              <div className="absolute top-0 left-0 w-screen h-screen bg-red-300 opacity-75">
                <div className="flex flex-col justify-center items-center h-full">
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
            className="mr-4 p-1 border-black border-2 border-solid rounded-md mt-4 hover:bg-blue-300 duration-300"
            type="submit"
          >
            Add Player
          </button>
          <button
            className="m-3 p-1 border-black border-2 border-solid rounded-md hover:bg-red-300 duration-300"
            type="reset"
            onClick={() => {
              setMessage("");
            }}
          >
            reset
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Players
      </button>
    </>
  );
}
