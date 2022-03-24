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
        if (this.props.id === "-1") {
            // This is a new card being added.
            postAuthJson('/api/card/add', this.props.jwtToken, {
                name: this.state.name,
                status: this.state.status,
                content: this.state.content,
                category: this.state.category
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => {
                        const id = data.message.substr(5).split(']')[0];
                        this.props.onEndEditAndAdd(
                            id,
                            this.state.name,
                            this.state.status,
                            this.state.content,
                            this.state.category
                        );
                    });
                };
            });
        } else {
            // This is an existing card being edited.
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
    }

    render() {
        return (
            <div className="EditeeCard Card">
                <div className="row1">
                    <input className="category textInput" type="text" name="category" placeholder="Category" onChange={this.handleChangeCategory} value={this.state.category} />
                    <div></div>
                </div>
                <input className="name textInput" type="text" name="name" placeholder="Name" onChange={this.handleChangeName} value={this.state.name} />
                <textarea className="content textInput" name="content" placeholder="Content" onChange={this.handleChangeContent} value={this.state.content} />
                <input className="status textInput" type="text" name="status" placeholder="Status" onChange={this.handleChangeStatus} value={this.state.status} />
                <div className="author">{this.props.author}</div>
                <div className="okCancelButtons">
                    <button onClick={this.handleEditCancel}>Cancel</button>
                    <button onClick={this.handleEditOk}>OK</button>
                </div>
            </div>
        )
    }
}

export default EditeeCard
