const React = require('react');

class NewCard extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="NewCard Card">
                <button onClick={this.props.onNewCard}>Add New Card</button>
            </div>
        )
    }
}

export default NewCard
