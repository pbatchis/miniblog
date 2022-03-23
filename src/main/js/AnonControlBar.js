const React = require('react');

function AnonControlBar(props) {
    return (
        <div className="ControlBar">
            <a href="#" onClick={props.onBlog}>Blog</a>
            <a href="#" onClick={props.onRegister}>Register</a>
            <a href="#" onClick={props.onSignIn}>Sign In</a>
        </div>
    )
}

export default AnonControlBar
