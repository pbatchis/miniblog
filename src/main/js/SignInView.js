const React = require('react');
const postJson = require('./postJson').default;

class SignInView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '', 
            failureMessage: ''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        postJson('/api/auth/signin', {
            username: this.state.username, 
            password: this.state.password
        })
        .then((response) => {
            if (response.ok) {
                this.setState({failureMessage: ''});
                response.json().then(data => {
                    this.props.onSignInSuccess(data.username, data.accessToken);
                })
            } else {
                response.json().then(data => {
                    this.setState({failureMessage: 'Sign in Failed: ' + data.message});
                })
            }
        });
    }

    render() {
        return (
            <div className="SignInView AuthView MainView">
                <div className="header">
                    Sign In
                </div>
                <div className="body">
                    <div>
                        Please enter your username and password:
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Username
                                <input type="text" name="username" onChange={this.handleChangeUsername} />
                            </label>
                            <label>
                                Password
                                <input type="password" name="password" onChange={this.handleChangePassword} />
                            </label>
                            <input className="button" type="submit" value="Sign In" />
                        </form>
                    </div>
                    <div className="errorMessage">
                        {this.state.failureMessage}
                    </div>
                </div>
            </div>
        )
    }
}

export default SignInView
