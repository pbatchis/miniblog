const React = require('react');

class Card extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Card">
                <div>{this.props.category}</div>
                <div>{this.props.name}</div>
                <div>{this.props.content}</div>
                <div>{this.props.status}</div>
                <div>{this.props.author}</div>
            </div>
        )
    }
}

export default Card
