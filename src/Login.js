import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { LoginContext } from "./LoginContext.js";
import Header from "./Header.js";
const cookies = new Cookies();

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isLoggedIn, changeLoggedIn, setCurrentUser] = useContext(LoginContext);
  const url = "https://nfl-players-server.herokuapp.com/users/login";
  const token = cookies.get("TOKEN");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  useEffect(() => {
    if (!token) {
      changeLoggedIn(false);
    }
  }, [token, changeLoggedIn]);

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
          cookies.set("TOKEN", response.data.token, {
            path: "/",
            maxAge: 600,
          });
          navigate("/");
          changeLoggedIn(true);
          setCurrentUser(response.data.username);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        console.log(error.message);
        console.log(error);
        navigate("/login");
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
              <div className="p-2">Login Page</div>
              <form onSubmit={handleFormSubmit} className="flex flex-col">
                <label for="user">Username </label>
                <input
                  className="mt-1 mb-1"
                  type="text"
                  id="user"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
                <label for="password">Password </label>
                <input
                  className="mt-1 mb-1"
                  type="password"
                  id="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <div className="text-center">
                  <button className="bg-white text-indigo-600 m-3 w-[80px] border-2 border-solid border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white duration-500 text-sm p-1">
                    Login
                  </button>
                  <div className="text-xs">
                    <p>username: newuser1</p> <p>password: newuser1</p>
                  </div>
                  {errorMsg ? (
                    <div className="text-red-600">{errorMsg}</div>
                  ) : null}
                </div>
              </form>

              <div className="flex">
                <div className="p-2">Not a user?</div>
                <button
                  className="text-indigo-500 hover:underline duration-300"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register here
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
