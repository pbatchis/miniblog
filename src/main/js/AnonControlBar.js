import React from "react";

function AnonControlBar(props) {
  return (
    <div className="ControlBar">
      <div className="startSide">
        <a href="#" onClick={props.onBlog}>
          Blog!
        </a>
      </div>
      <div className="endSide">
        <a href="#" onClick={props.onRegister}>
          Register
        </a>
        <a href="#" onClick={props.onSignIn}>
          Sign In
        </a>
      </div>
    </div>
  );
}

export default AnonControlBar;
