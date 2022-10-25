import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPlayer() {
  const [newPlayerName, setNewPlayerName] = useState();
  const [newPlayerPosition, setNewPlayerPosition] = useState();
  const [newPlayerTeam, setNewPlayerTeam] = useState();
  const [newPlayerAge, setNewPlayerAge] = useState();
  const [newPlayerInfo, setNewPlayerInfo] = useState();
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
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label for="name">Name: </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
        </div>
        <div>
          <label for="position">Position: </label>
          <input
            type="text"
            id="position"
            name="position"
            onChange={(e) => setNewPlayerPosition(e.target.value)}
          />
        </div>
        <div>
          <label for="team">Team: </label>
          <input
            type="text"
            id="team"
            name="team"
            onChange={(e) => setNewPlayerTeam(e.target.value)}
          />
        </div>
        <div>
          <label for="age">Age: </label>
          <input
            type="text"
            id="age"
            name="age"
            onChange={(e) => setNewPlayerAge(e.target.value)}
          />
        </div>
        <div>{message ? <>{message + " " + newPlayerName}</> : null}</div>
        <button type="submit">Add Player</button>
        <button
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
