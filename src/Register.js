import { useState, useEffect } from "react";

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(username, password, email);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <label for="user">Username: </label>
        <input
          type="text"
          id="user"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />

        <label for="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label for="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="henry@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button>Register</button>
      </form>
    </>
  );
}
