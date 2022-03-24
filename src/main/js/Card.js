const React = require('react');

class Card extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit() {
        this.props.onEdit(this.props.id);
    }

    handleDelete() {

    }

    isEditable() {
        return (this.props.author === this.props.signedInUsername)
    }

    render() {
        return (
            <div className="Card">
                <div>
                    <div className="category">{this.props.category}</div>
                    {this.isEditable() &&
                        <div>
                            <button onClick={this.handleEdit}>Edit</button>
                            <button onClick={this.handleDelete}>Delete</button>
                        </div>
                    }
                </div>
                <div className="name">{this.props.name}</div>
                <div className="content">{this.props.content}</div>
                <div className="status">{this.props.status}</div>
                <div className="author">{this.props.author}</div>
            </div>
        )
    }
}

export default Card
