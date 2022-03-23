const React = require('react');

class ControlBar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className="ControlBar">
            this.props.signedIn ? {
                <a onClick={this.props.onSignOut}>Sign-Out</a>
            } : {
                <>
                    <a onClick={this.props.onBlog}>Blog</a>
                    <a onClick={this.props.onRegister}>Register</a>
                    <a onClick={this.props.onSignIn}>Sign-In</a>
                </>
            }
        </div>
      )
  }
}

export default ControlBar