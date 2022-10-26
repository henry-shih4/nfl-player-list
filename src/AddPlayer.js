import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPlayer() {
  const [newPlayerName, setNewPlayerName] = useState();
  const [newPlayerPosition, setNewPlayerPosition] = useState();
  const [newPlayerTeam, setNewPlayerTeam] = useState();
  const [newPlayerAge, setNewPlayerAge] = useState();
  const [newPlayerInfo, setNewPlayerInfo] = useState();
  // const [addedPlayerName, setAddedPlayerName] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(newPlayerInfo);
  // });

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
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <form className="p-2" onSubmit={handleFormSubmit}>
        <div className="p-2">
          <label for="name">Name: </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            onChange={(e) => {
              setNewPlayerName(e.target.value);
              // setAddedPlayerName(e.target.value);
            }}
          />
        </div>
        <div className="p-2">
          <label for="position">Position: </label>
          <input
            type="text"
            id="position"
            name="position"
            onChange={(e) => setNewPlayerPosition(e.target.value)}
          />
        </div>
        <div className="p-2">
          <label for="team">Team: </label>
          <input
            type="text"
            id="team"
            name="team"
            onChange={(e) => setNewPlayerTeam(e.target.value)}
          />
        </div>
        <div className="p-2">
          <label for="age">Age: </label>
          <input
            type="text"
            id="age"
            name="age"
            onChange={(e) => setNewPlayerAge(e.target.value)}
          />
        </div>
        <div>{message ? <>{message + " " + newPlayerName}</> : null}</div>
        <button
          className="mr-4 p-1 border-black border-2 border-solid rounded-md"
          type="submit"
        >
          Add Player
        </button>
        <button
          className="p-1 border-black border-2 border-solid rounded-md"
          type="reset"
          onClick={() => {
            setMessage("");
          }}
        >
          reset
        </button>
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
