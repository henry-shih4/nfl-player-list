import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  let { handleToken } = props;

  const url = "https://nfl-players-server.herokuapp.com/users/login";

  useEffect(() => {
    setUser({
      username: username,
      password: password,
    });
  }, [username, password]);

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post(url, user)
      .then((response) => {
        if (response.data.message === "Login Successful") {
          console.log(response);
          handleToken(response.data.token);
          console.log("logged in");
          navigate("/");
        } else {
          console.log("invalid credentials");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <label for="user">Username: </label>
        <input
          type="text"
          id="user"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <label for="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button>Login</button>
      </form>

      <div className="flex flex-col">
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Not a user? Register here
        </button>
      </div>
    </>
  );
}
