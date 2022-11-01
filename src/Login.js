import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { LoginContext } from "./LoginContext.js";
const cookies = new Cookies();

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const url = "https://nfl-players-server.herokuapp.com/users/login";

  useEffect(() => {
    console.log(isLoggedIn);
  });

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
          console.log("logged in");
          cookies.set("TOKEN", response.data.token, {
            path: "/",
            maxAge: 300,
          });
          navigate("/");
          setIsLoggedIn(true);
        } else {
          console.log("invalid credentials");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }

  return (
    <>
      {isLoggedIn ? (
        <div>You are logged in.</div>
      ) : (
        <>
          <div>Login Page</div>
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
      )}
    </>
  );
}
