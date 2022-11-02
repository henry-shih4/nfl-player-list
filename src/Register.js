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
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const url = "https://nfl-players-server.herokuapp.com/users/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [msg]);

  useEffect(() => {
    setNewUser({
      username: username,
      password: password,
      email: email,
    });
  }, [username, password, email]);

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post(url, newUser)
      .then((response) => {
        setMsg(response.request.statusText + " " + "new user");
        console.log(response);
        if (response.status === 201) {
          setUsername("");
          setPassword("");
          setEmail("");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setMsg(error.response.data.conflict);
      });
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <div>You are already logged in.</div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Back to main page
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="flex justify-between flex-col items-center h-[300px] w-[300px] bg-red-300 rounded-lg">
              <div className="p-2">Registration</div>
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
                {msg ? <div className="text-center">{msg}</div> : null}
              </form>
              <button onClick={() => navigate("/login")}>Login Page</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
