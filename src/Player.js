import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Player() {
  const params = useParams();
  const [playerInfo, setPlayerInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/players/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setPlayerInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  function handlePlayerDelete() {
    axios
      .delete("http://localhost:8082/api/players/" + params.id)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div>Player</div>
      {playerInfo ? (
        <div>
          <div>Name: {playerInfo.name}</div>
          <div>Position: {playerInfo.position}</div>
          <div>Team: {playerInfo.team}</div>
          <div>Age: {playerInfo.age}</div>
        </div>
      ) : null}
      <button onClick={handlePlayerDelete}>delete player</button>
      <button onClick={()=>{navigate('/')}}>back to players</button>
    </>
  );
}
