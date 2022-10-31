import { useState, useEffect } from "react";

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    console.log(username, password, email);
  });

function handleFormSubmit(){
setUsername()
}

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <label for="user">Username: </label>
        <input type="text" id="user" value={username} placeholder="username" />

        <label for="password">Password: </label>
        <input type="password" id="password" value={password} />

        <label for="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="henry@gmail.com"
          value={email}
        />
      </form>

      <button>Register</button>
    </>
  );
}
