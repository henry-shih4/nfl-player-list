import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginContext = createContext();

function LoginProvider(props) {
  const token = cookies.get("TOKEN");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    if (token) {
      const user = parseJwt(token);
      setActiveUser(user.username);
    }
  }, [token]);

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  function setCurrentUser(user) {
    if (user) {
      setActiveUser(user);
    }
  }

  function changeLoggedIn(value) {
    setIsLoggedIn(value);
    if (value === false) {
      cookies.remove("TOKEN", { path: "/login" });
    }
  }

  return (
    <LoginContext.Provider
      value={[isLoggedIn, changeLoggedIn, setCurrentUser, activeUser]}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
