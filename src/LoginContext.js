import { createContext, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginContext = createContext();

function LoginProvider(props) {
  const token = cookies.get("TOKEN");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [activeUser, setActiveUser] = useState();

  function changeLoggedIn(value) {
    setIsLoggedIn(value);
    if (value === false) {
      cookies.remove("TOKEN", { path: "/login" });
      setActiveUser("");
    }
  }

  return (
    <LoginContext.Provider
      value={[isLoggedIn, changeLoggedIn, activeUser, setActiveUser]}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
