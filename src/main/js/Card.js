const React = require('react');

class Card extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Card">
                <div className="category">{this.props.category}</div>
                <div className="name">{this.props.name}</div>
                <div className="content">{this.props.content}</div>
                <div className="status">{this.props.status}</div>
                <div className="author">{this.props.author}</div>
            </div>
        )
    }
}

export default Card
