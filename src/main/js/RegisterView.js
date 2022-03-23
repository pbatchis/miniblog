const React = require('react');

class RegisterView extends React.Component {

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
        this.handleRegisterResponse = this.handleRegisterResponse.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username, 
                    password: this.state.password
                })
            })
            .then(this.handleRegisterResponse)
    }

    handleRegisterResponse(response) {
        if (response.ok) {
            this.setState({failureMessage: ''});

        } else {
            response.json().then( data => {
                this.setState({failureMessage: 'Registration Failed: ' + data.message});
            })
        }
    }

    render() {
        return (
            <div className="MainView">
                <div>
                    Register a New Account
                </div>
                <div>
                    <div>
                        Please choose a username and password:
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
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                    <div>
                        {this.state.failureMessage}
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterView
