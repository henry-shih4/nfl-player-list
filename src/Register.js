import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext.js";

export default function Register() {
  const [isLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();
  const url = "https://nfl-players-server.herokuapp.com/users/";

  useEffect(() => {
    setNewUser({
      username: username,
      password: password,
      email: email,
    });
  }, [username, password, email]);

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(username, password, email);
    axios
      .post(url, newUser)
      .then((response) => {
        console.log("created");
        console.log(response);
        if (response.status === 201) {
          setUsername("");
          setPassword("");
          setEmail("");
        }
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <div>Logged in</div>
        </>
      ) : (
        <>
          <div>Registration</div>
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <label for="user">Username: </label>
            <input
              type="text"
              id="user"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              placeholder="username"
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

            <label for="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="henry@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <button>Register</button>
          </form>
          <button onClick={() => navigate("/login")}>Login Page</button>
        </>
      )}
    </>
  );
}
