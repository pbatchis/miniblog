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
            signedIn: false, 
            viewMode: 'BlogView', 
            jwtToken: null
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleBlog = this.handleBlog.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignInSuccess = this.handleSignInSuccess.bind(this);
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

    handleSignInSuccess(jwtToken) {
        this.setState({
            signedIn: true,
            viewMode: 'BlogView', 
            jwtToken: jwtToken
        });
        console.log('App set jwtToken: ' + jwtToken);
    }

    handleSignOut(event) {
        event.preventDefault();
        this.setState({
            signedIn: false, 
            viewMode: 'BlogView', 
            jwtToken: null
        })
    }

    isSignedIn() {
        return (this.state.jwtToken != null)
    }

    mainViewComponent() {
        switch (this.state.viewMode) {
            case 'BlogView': return <BlogView />
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
                            onSignOut={this.handleSignOut} />
                    : <AnonControlBar
                            onBlog={this.handleBlog}
                            onRegister={this.handleRegister}
                            onSignIn={this.handleSignIn} />
                }
                {this.mainViewComponent()}
            </div>
        )
    }
}

export default App
