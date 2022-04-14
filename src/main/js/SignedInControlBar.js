const React = require("react");

function SignedInControlBar(props) {
  return (
    <div className="ControlBar">
      <div className="startSide">
        <a href="#" onClick={props.onBlog}>
          Blog!
        </a>
      </div>
      <div className="endSide">
        <a href="#" onClick={props.onSignOut}>
          Sign Out
        </a>
      </div>
    </div>
  );
}

export default SignedInControlBar;
