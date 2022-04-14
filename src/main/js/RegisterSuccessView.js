const React = require("react");

function RegisterSuccessView(props) {
  return (
    <div className="RegisterView AuthView MainView">
      <div className="header">Registration Successful!</div>
      <div className="body">
        <div>
          <a href="#" onClick={props.onSignIn}>
            Please sign in with your new account
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccessView;
