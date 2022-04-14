import React, { useState } from "react";
import AnonControlBar from "./AnonControlBar";
import SignedInControlBar from "./SignedInControlBar";
import BlogView from "./BlogView";
import RegisterView from "./RegisterView";
import RegisterSuccessView from "./RegisterSuccessView";
import SignInView from "./SignInView";

function App(props) {
  const [viewMode, setViewMode] = useState("BlogView");
  const [username, setUsername] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  function handleBlog(event) {
    event.preventDefault();
    setViewMode("BlogView");
  }

  function handleRegister(event) {
    event.preventDefault();
    setViewMode("RegisterView");
  }

  function handleRegisterSuccess() {
    setViewMode("RegisterSuccessView");
  }

  function handleSignIn(event) {
    event.preventDefault();
    setViewMode("SignInView");
  }

  function handleSignInSuccess(username, jwtToken) {
    setViewMode("BlogView");
    setUsername(username);
    setJwtToken(jwtToken);
  }

  function handleSignOut(event) {
    event.preventDefault();
    setViewMode("BlogView");
    setUsername(null);
    setJwtToken(null);
  }

  function isSignedIn() {
    return jwtToken !== null;
  }

  function buildMainView() {
    switch (viewMode) {
      case "BlogView":
        return <BlogView username={username} jwtToken={jwtToken} />;
      case "RegisterView":
        return <RegisterView onRegisterSuccess={handleRegisterSuccess} />;
      case "RegisterSuccessView":
        return <RegisterSuccessView onSignIn={handleSignIn} />;
      case "SignInView":
        return <SignInView onSignInSuccess={handleSignInSuccess} />;
      default:
        return null;
    }
  }

  return (
    <div className="App">
      {isSignedIn() ? (
        <SignedInControlBar onBlog={handleBlog} onSignOut={handleSignOut} />
      ) : (
        <AnonControlBar
          onBlog={handleBlog}
          onRegister={handleRegister}
          onSignIn={handleSignIn}
        />
      )}
      {buildMainView()}
    </div>
  );
}

export default App;
