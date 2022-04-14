const React = require("react");
const Card = require("./Card").default;
const EditeeCard = require("./EditeeCard").default;
const NewCard = require("./NewCard").default;
const postAuthJson = require("./postAuthJson").default;

class BlogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      editeeId: null, // ID of the card being edited.
    };
    this.loadCards = this.loadCards.bind(this);
    this.handleNewCard = this.handleNewCard.bind(this);
    this.handleBeginEdit = this.handleBeginEdit.bind(this);
    this.handleEndEdit = this.handleEndEdit.bind(this);
    this.handleEndEditAndUpdate = this.handleEndEditAndUpdate.bind(this);
    this.handleEndEditAndAdd = this.handleEndEditAndAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.loadCards();
  }

  loadCards() {
    fetch("/api/card/get").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          this.setState({
            // reverse sort cards by id
            cards: data.cards.sort((a, b) => b.id - a.id),
          });
        });
      }
    });
  }

  handleNewCard() {
    this.setState((state, props) => {
      if (!(state.editeeId === null)) {
        return {};
      }
      const updatedCards = [];
      updatedCards.push({
        id: -1,
        name: "",
        status: "",
        content: "",
        category: "",
        author: props.username,
      });
      for (let card of state.cards) {
        updatedCards.push({
          id: card.id,
          name: card.name,
          status: card.status,
          content: card.content,
          category: card.category,
          author: card.author,
        });
      }
      return {
        cards: updatedCards,
        editeeId: "-1",
      };
    });
  }

  handleBeginEdit(cardId) {
    this.setState({ editeeId: cardId });
  }

  handleEndEdit(cardId) {
    // remove card from state if it doesn't exist (a cancelled add card).
    // remove card from editee session.
    this.setState((state, props) => {
      const updatedCards = [];
      for (let card of state.cards) {
        // id of -1 means the card didn't exist.
        if (!(card.id === -1)) {
          updatedCards.push({
            id: card.id,
            name: card.name,
            status: card.status,
            content: card.content,
            category: card.category,
            author: card.author,
          });
        }
      }
      return {
        cards: updatedCards,
        editeeId: null,
      };
    });
  }

  handleEndEditAndAdd(cardId, name, status, content, category) {
    this.setState((state, props) => {
      const cardIdNum = parseInt(cardId);
      const updatedCards = [];
      updatedCards.push({
        id: cardIdNum,
        name: name,
        status: status,
        content: content,
        category: category,
        author: props.username,
      });
      for (let card of state.cards) {
        if (!(card.id === -1)) {
          updatedCards.push({
            id: card.id,
            name: card.name,
            status: card.status,
            content: card.content,
            category: card.category,
            author: card.author,
          });
        }
      }
      return {
        cards: updatedCards,
        editeeId: null,
      };
    });
  }

  handleEndEditAndUpdate(cardId, name, status, content, category) {
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
            author: card.author,
          });
        } else {
          updatedCards.push({
            id: card.id,
            name: card.name,
            status: card.status,
            content: card.content,
            category: card.category,
            author: card.author,
          });
        }
      }
      return {
        cards: updatedCards,
        editeeId: null,
      };
    });
  }

  handleDelete(cardId) {
    postAuthJson("/api/card/delete", this.props.jwtToken, {
      id: cardId,
    }).then((response) => {
      if (response.ok) {
        // remove card from state
        this.setState((state, props) => {
          const cardIdNum = parseInt(cardId);
          const updatedCards = [];
          for (let card of state.cards) {
            if (!(card.id === cardIdNum)) {
              updatedCards.push({
                id: card.id,
                name: card.name,
                status: card.status,
                content: card.content,
                category: card.category,
                author: card.author,
              });
            }
          }
          return { cards: updatedCards };
        });
      }
    });
  }

  buildCardListItem(id, name, status, content, category, author) {
    return id === this.state.editeeId ? (
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
          onEndEditAndUpdate={this.handleEndEditAndUpdate}
          onEndEditAndAdd={this.handleEndEditAndAdd}
        />
      </li>
    ) : (
      <li>
        <Card
          key={id}
          id={id}
          name={name}
          status={status}
          content={content}
          category={category}
          author={author}
          signedInUsername={this.props.username}
          onEdit={this.handleBeginEdit}
          onDelete={this.handleDelete}
        />
      </li>
    );
  }

  render() {
    return (
      <div className="BlogView MainView">
        <ul className="CardList">
          {!(this.props.username === null) && (
            <li>
              <NewCard key="new" onNewCard={this.handleNewCard} />
            </li>
          )}
          {this.state.cards.map((card) =>
            this.buildCardListItem(
              card.id.toString(),
              card.name,
              card.status,
              card.content,
              card.category,
              card.author
            )
          )}
        </ul>
      </div>
    );
  }
}

export default BlogView;
