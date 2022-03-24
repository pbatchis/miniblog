const React = require('react');

class Card extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirmingDelete: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    }

    handleEdit() {
        this.props.onEdit(this.props.id);
    }

    handleDelete() {
        this.setState({confirmingDelete: true});
    }

    handleCancelDelete() {
        this.setState({confirmingDelete: false});
    }

    handleConfirmDelete() {
        this.props.onDelete(this.props.id);
    }

    isEditable() {
        return (this.props.author === this.props.signedInUsername)
    }

    render() {
        return (
            <div className="Card">
                {this.state.confirmingDelete &&
                    <div className="confirmDelete">
                        <div>Are you sure you want to Delete this card?</div>
                        <div className="confirmDeleteButtons">
                            <button onClick={this.handleCancelDelete}>Cancel</button>
                            <button onClick={this.handleConfirmDelete}>Yes, Delete</button>
                        </div>
                    </div>
                }
                <div className="row1">
                    <div className="category">{this.props.category}</div>
                    {this.isEditable() && !this.state.confirmingDelete &&
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
