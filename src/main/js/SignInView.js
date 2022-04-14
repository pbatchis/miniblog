import React, { useState } from "react";
import postJson from "./postJson";

function SignInView(props) {
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
    postJson("/api/auth/signin", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.ok) {
        setFailureMessage("");
        response.json().then((data) => {
          props.onSignInSuccess(data.username, data.accessToken);
        });
      } else {
        response.json().then((data) => {
          setFailureMessage(`Sign in Failed: ${data.message}`);
        });
      }
    });
  }

  return (
    <div className="SignInView AuthView MainView">
      <div className="header">Sign In</div>
      <div className="body">
        <div>Please enter your username and password:</div>
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
              <input className="button" type="submit" value="Sign In" />
            </div>
          </form>
        </div>
        <div className="errorMessage">{failureMessage}</div>
      </div>
    </div>
  );
}

export default SignInView;
