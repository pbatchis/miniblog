const React = require('react');
const Card = require('./Card').default;

class BlogView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
        this.loadCards = this.loadCards.bind(this);
    }

    componentDidMount() {
        this.loadCards();
    }

    loadCards() {
        fetch('/api/card/get').then((response) => {
            if (response.ok) {
                response.json().then( data => {
                    this.setState({
                        cards: data.cards
                    });
                })
            }    
        })
    }

    render() {
        const cards = this.state.cards.map((card) =>
            <Card key={card.id.toString()} name={card.name} status={card.status} 
                    content={card.content} category={card.category} author={card.author} />
        );
        return (
            <div className="BlogView MainView">
                <div className="CardList">
                    {cards}
                </div>
            </div>
        )
    }
}

export default BlogView
