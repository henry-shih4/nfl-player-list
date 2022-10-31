import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const url = "https://nfl-players-server.herokuapp.com/api/users/login";

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
        if (response.data === "success") {
          console.log("logged in");
          navigate("/");
        } else if (response.data === "not allowed") {
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