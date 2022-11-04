import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Admin() {
  const token = cookies.get("TOKEN");
  const url = "https://nfl-players-server.herokuapp.com/users/admin";
  const [adminInfo, setAdminInfo] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log(errorMsg);
  //   });

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAdminInfo(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMsg(error.response.statusText);
        }
        console.log(error.message);
      });
  }, [token]);

  return (
    <>
      <div>
        {adminInfo ? <div>secret Admin page</div> : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back to main
        </button>
      </div>
    </>
  );
}
