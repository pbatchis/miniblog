import React, { useState } from "react";
import AnonControlBar from "./AnonControlBar";
import SignedInControlBar from "./SignedInControlBar";
import BlogView from "./BlogView";
import RegisterView from "./RegisterView";
import RegisterSuccessView from "./RegisterSuccessView";
import SignInView from "./SignInView";

function App() {
  const ViewMode = {
    BlogView: "BlogView",
    RegisterView: "RegisterView",
    RegisterSuccessView: "RegisterSuccessView",
    SignInView: "SignInView",
  };
  const [viewMode, setViewMode] = useState(ViewMode.BlogView);
  const [username, setUsername] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  function handleBlog(event) {
    event.preventDefault();
    setViewMode(ViewMode.BlogView);
  }

  function handleRegister(event) {
    event.preventDefault();
    setViewMode(ViewMode.RegisterView);
  }

  function handleRegisterSuccess() {
    setViewMode(ViewMode.RegisterSuccessView);
  }

  function handleSignIn(event) {
    event.preventDefault();
    setViewMode(ViewMode.SignInView);
  }

  function handleSignInSuccess(username, jwtToken) {
    setViewMode(ViewMode.BlogView);
    setUsername(username);
    setJwtToken(jwtToken);
  }

  function handleSignOut(event) {
    event.preventDefault();
    setViewMode(ViewMode.BlogView);
    setUsername(null);
    setJwtToken(null);
  }

  function buildControlBar() {
    return jwtToken === null ? (
      <AnonControlBar
        onBlog={handleBlog}
        onRegister={handleRegister}
        onSignIn={handleSignIn}
      />
    ) : (
      <SignedInControlBar onBlog={handleBlog} onSignOut={handleSignOut} />
    );
  }

  function buildMainView() {
    switch (viewMode) {
      case ViewMode.BlogView:
        return <BlogView username={username} jwtToken={jwtToken} />;
      case ViewMode.RegisterView:
        return <RegisterView onRegisterSuccess={handleRegisterSuccess} />;
      case ViewMode.RegisterSuccessView:
        return <RegisterSuccessView onSignIn={handleSignIn} />;
      case ViewMode.SignInView:
        return <SignInView onSignInSuccess={handleSignInSuccess} />;
      default:
        return null;
    }
  }

  return (
    <div className="App">
      {buildControlBar()}
      {buildMainView()}
    </div>
  );
}

export default App;
