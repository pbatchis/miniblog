const React = require('react');

function SignedInControlBar(props) {
    return (
        <div className="ControlBar">
            <a onClick={props.onSignOut}>Sign Out</a>
        </div>
    )
}

export default SignedInControlBar
