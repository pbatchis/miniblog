import postAuthJson from './postAuthJson';

const React = require('react');

class EditeeCard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            name: this.props.name,
            content: this.props.content,
            status: this.props.status
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleEditOk = this.handleEditOk.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
    }

    handleChangeCategory(event) {
        this.setState({category: event.target.value});
    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }
    handleChangeStatus(event) {
        this.setState({status: event.target.value});
    }

    handleEditCancel() {
        this.props.onEndEdit(this.props.id);
    }

    handleEditOk() {
        // Save the card state, then end the edit session and update card state.
        postAuthJson('/api/card/edit', this.props.jwtToken, {
            id: this.props.id,
            name: this.state.name,
            status: this.state.status,
            content: this.state.content,
            category: this.state.category
        })
        .then((response) => {
            if (response.ok) {
                this.props.onEndEditAndUpdate(
                    this.props.id,
                    this.state.name,
                    this.state.status,
                    this.state.content,
                    this.state.category
                );
            }
        })
    }

    render() {
        return (
            <div className="Card">
                <div>
                    <input type="text" name="category" onChange={this.handleChangeCategory} value={this.state.category} />
                    <div>
                        <button onClick={this.handleEditOk}>OK</button>
                        <button onClick={this.handleEditCancel}>Cancel</button>
                    </div>
                </div>
                <input type="text" name="name" onChange={this.handleChangeName} value={this.state.name} />
                <textarea name="content" onChange={this.handleChangeContent} value={this.state.content} />
                <input type="text" name="status" onChange={this.handleChangeStatus} value={this.state.status} />
                <div className="author">{this.props.author}</div>
            </div>
        )
    }
}

export default EditeeCard
