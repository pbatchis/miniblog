import React, { useState } from "react";
import postJson from "./postJson";

function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    postJson("/api/auth/register", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.ok) {
        setFailureMessage("");
        props.onRegisterSuccess();
      } else {
        response.json().then((data) => {
          setFailureMessage("Registration Failed: " + data.message);
        });
      }
    });
  }

  return (
    <div className="RegisterView AuthView MainView">
      <div className="header">Register a New Account</div>
      <div className="body">
        <div>Please choose a username and password:</div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div>
              <label for="username">Username </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChangeUsername}
              />
            </div>
            <div>
              <label for="password">Password </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChangePassword}
              />
            </div>
            <div>
              <input className="button" type="submit" value="Register" />
            </div>
          </form>
        </div>
        <div className="errorMessage">{failureMessage}</div>
      </div>
    </div>
  );
}

export default RegisterView;
