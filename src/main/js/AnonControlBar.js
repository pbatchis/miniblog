const React = require('react');

function AnonControlBar(props) {
    return (
        <div className="ControlBar">
            <a onClick={props.onBlog}>Blog</a>
            <a onClick={props.onRegister}>Register</a>
            <a onClick={props.onSignIn}>Sign In</a>
        </div>
    )
}

export default AnonControlBar
