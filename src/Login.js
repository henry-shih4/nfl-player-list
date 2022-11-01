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
  const [errorMsg, setErrorMsg] = useState();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const url = "https://nfl-players-server.herokuapp.com/users/login";
  const token = cookies.get("TOKEN");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    }
  }, [token]);

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
            maxAge: 300,
          });
          navigate("/");
          setIsLoggedIn(true);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        console.log(error.message);
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
          <div className="flex justify-center items-center h-screen">
            <div className="flex justify-between flex-col items-center h-[300px] w-[300px] bg-red-300 rounded-lg">
              <div className="p-2">Login Page</div>
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
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <div className="text-center">
                  <button className="border-black border-2 border-solid m-3 w-[60px] rounded-md hover:bg-white duration-500">
                    Login
                  </button>
                  {errorMsg ? <div>{errorMsg}</div> : null}
                </div>
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
