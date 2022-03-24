const React = require('react');
const Card = require('./Card').default;
const EditeeCard = require('./EditeeCard').default;

class BlogView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            editeeId: null  // ID of the card being edited.
        }
        this.loadCards = this.loadCards.bind(this);
        this.handleBeginEdit = this.handleBeginEdit.bind(this);
        this.handleEndEdit = this.handleEndEdit.bind(this);
        this.handleEndEditAndUpdate = this.handleEndEditAndUpdate.bind(this);
    }

    componentDidMount() {
        this.loadCards();
    }

    loadCards() {
        fetch('/api/card/get').then((response) => {
            if (response.ok) {
                response.json().then( data => {
                    this.setState({
                        // reverse sort cards by id
                        cards: data.cards.sort((a, b) => b.id - a.id)
                    });
                })
            }    
        })
    }

    handleBeginEdit(cardId) {
        this.setState({editeeId: cardId});
    }

    handleEndEdit(cardId) {
        this.setState((state) => {
            if (cardId === state.editeeId) {
                return {editeeId: null};
            }
            return {};
        });
    }

    handleEndEditAndUpdate(cardId, name, status, content, category) {
        this.handleEndEdit(cardId);
        this.setState((state, props) => {
            const cardIdNum = parseInt(cardId);
            const updatedCards = [];
            for (let card of state.cards) {
                if (card.id === cardIdNum) {
                    updatedCards.push({
                        id: card.id,
                        name: name,
                        status: status,
                        content: content,
                        category: category,
                        author: card.author
                    });
                } else {
                    updatedCards.push({
                        id: card.id,
                        name: card.name,
                        status: card.status,
                        content: card.content,
                        category: card.category,
                        author: card.author
                    });
                }
            }
            return {cards: updatedCards};
        });
    }

    buildCardListItem(id, name, status, content, category, author) {
        return (id === this.state.editeeId)
            ?
                <li>
                    <EditeeCard
                        key={id}
                        id={id}
                        name={name}
                        status={status}
                        content={content}
                        category={category}
                        author={author}
                        jwtToken={this.props.jwtToken}
                        onEndEdit={this.handleEndEdit}
                        onEndEditAndUpdate={this.handleEndEditAndUpdate} />
                </li>
            :
                <li>
                    <Card
                        key={id}
                        id={id}
                        name={name}
                        status={status}
                        content={content}
                        category={category}
                        author={author}
                        editeeKey={this.state.editeeKey}
                        signedInUsername={this.props.username}
                        onEdit={this.handleBeginEdit} />
                </li>
    }

    render() {
        return (
            <div className="BlogView MainView">
                <ul className="CardList">
                    {this.state.cards.map((card) => this.buildCardListItem(
                            card.id.toString(),
                            card.name,
                            card.status, 
                            card.content, 
                            card.category, 
                            card.author))
                    }
                </ul>
            </div>
        )
    }
}

export default BlogView
