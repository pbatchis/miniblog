import React, { useState, useEffect } from "react";
import Card from "./Card";
import EditeeCard from "./EditeeCard";
import NewCard from "./NewCard";
import postAuthJson from "./postAuthJson";

function BlogView(props) {
  const [cards, setCards] = useState([]);
  const [editeeId, setEditeeId] = useState(null); // ID of the card being edited.

  useEffect(() => {
    loadCards();
  }, []);

  function loadCards() {
    fetch("/api/card/get").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // reverse sort cards by id
          setCards(data.cards.sort((a, b) => b.id - a.id));
        });
      }
    });
  }

  function handleNewCard() {
    if (editeeId !== null) {
      return;
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
    for (let card of cards) {
      updatedCards.push({
        id: card.id,
        name: card.name,
        status: card.status,
        content: card.content,
        category: card.category,
        author: card.author,
      });
    }
    setCards(updatedCards);
    setEditeeId("-1");
  }

  function handleBeginEdit(cardId) {
    setEditeeId(cardId);
  }

  function handleEndEdit(cardId) {
    // remove card from state if it doesn't exist (a cancelled add card).
    // remove card from editee session.
    const updatedCards = [];
    for (let card of cards) {
      // id of -1 means the card didn't exist.
      if (card.id !== -1) {
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
    setCards(updatedCards);
    setEditeeId(null);
  }

  function handleEndEditAndAdd(cardId, name, status, content, category) {
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
    for (let card of cards) {
      if (card.id !== -1) {
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
    setCards(updatedCards);
    setEditeeId(null);
  }

  function handleEndEditAndUpdate(cardId, name, status, content, category) {
    const cardIdNum = parseInt(cardId);
    const updatedCards = [];
    for (let card of cards) {
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
    setCards(updatedCards);
    setEditeeId(null);
  }

  function handleDelete(cardId) {
    postAuthJson("/api/card/delete", props.jwtToken, {
      id: cardId,
    }).then((response) => {
      if (response.ok) {
        // remove card from state
        const cardIdNum = parseInt(cardId);
        const updatedCards = [];
        for (let card of cards) {
          if (card.id !== cardIdNum) {
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
        setCards(updatedCards);
      }
    });
  }

  function buildCardListItem(id, name, status, content, category, author) {
    return id === editeeId ? (
      <li>
        <EditeeCard
          key={id}
          id={id}
          name={name}
          status={status}
          content={content}
          category={category}
          author={author}
          jwtToken={props.jwtToken}
          onEndEdit={handleEndEdit}
          onEndEditAndUpdate={handleEndEditAndUpdate}
          onEndEditAndAdd={handleEndEditAndAdd}
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
          signedInUsername={props.username}
          onEdit={handleBeginEdit}
          onDelete={handleDelete}
        />
      </li>
    );
  }

  return (
    <div className="BlogView MainView">
      <ul className="CardList">
        {props.username !== null && (
          <li>
            <NewCard key="new" onNewCard={handleNewCard} />
          </li>
        )}
        {cards.map((card) =>
          buildCardListItem(
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

export default BlogView;
