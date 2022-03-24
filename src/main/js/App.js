const React = require('react');
const AnonControlBar = require('./AnonControlBar').default;
const SignedInControlBar = require('./SignedControlBar').default;
const BlogView = require('./BlogView').default;
const RegisterView = require('./RegisterView').default;
const SignInView = require('./SignInView').default;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'BlogView', 
            username: null, 
            jwtToken: null
        };
        this.handleBlog = this.handleBlog.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignInSuccess = this.handleSignInSuccess.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleNewCard = this.handleNewCard.bind(this);
    }

    handleBlog(event) {
        event.preventDefault();
        this.setState({viewMode: 'BlogView'});
    }

    handleRegister(event) {
        event.preventDefault();
        this.setState({viewMode: 'RegisterView'});
    }

    handleSignIn(event) {
        event.preventDefault();
        this.setState({viewMode: 'SignInView'});
    }

    handleSignInSuccess(username, jwtToken) {
        this.setState({
            viewMode: 'BlogView', 
            username: username,
            jwtToken: jwtToken
        });
    }

    handleSignOut(event) {
        event.preventDefault();
        this.setState({
            viewMode: 'BlogView', 
            username: null,
            jwtToken: null
        })
    }

    handleNewCard(event) {
        event.preventDefault();

    }

    isSignedIn() {
        return (this.state.jwtToken != null)
    }

    buildMainView() {
        switch (this.state.viewMode) {
            case 'BlogView': return <BlogView username={this.state.username} jwtToken={this.state.jwtToken} />
            case 'RegisterView': return <RegisterView />
            case 'SignInView': return <SignInView onSignInSuccess={this.handleSignInSuccess} />
            default: return null
        }
    }

    render() {
        return (
            <div className="App">
                {this.isSignedIn()
                    ? <SignedInControlBar 
                            onBlog={this.handleBlog}
                            onNewCard={this.handleNewCard} 
                            onSignOut={this.handleSignOut} />
                    : <AnonControlBar
                            onBlog={this.handleBlog}
                            onRegister={this.handleRegister}
                            onSignIn={this.handleSignIn} />
                }
                {this.buildMainView()}
            </div>
        )
    }
}

export default App
