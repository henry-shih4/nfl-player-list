import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext.js";
import Header from "./Header.js";

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
        setMsg(`${response.request.statusText} new user`);
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
          <div className="flex flex-col justify-center items-center h-screen">
            <Header />
            <div className="flex justify-between flex-col items-center h-[340px] w-[340px] bg-slate-100 rounded-lg">
              <div className="p-2">Register</div>
              <form onSubmit={handleFormSubmit} className="flex flex-col">
                <label for="user">Username </label>
                <input
                  className="mt-1 mb-1"
                  type="text"
                  id="user"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  placeholder="username"
                />

                <label for="password">Password </label>
                <input
                  className="mt-1 mb-1"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                />

                <label for="email">Email </label>
                <input
                  className="mt-1 mb-1"
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <div className="text-center">
                  <button className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1">
                    Register
                  </button>
                </div>
                {msg ? <div className="text-center">{msg}</div> : null}
              </form>
              <div className="flex">
                <div className="p-2">Already a user? </div>
                <button
                  className="text-indigo-500 hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login Here
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
