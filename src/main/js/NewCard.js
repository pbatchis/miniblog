import React from "react";

function NewCard(props) {
  return (
    <div className="NewCard Card">
      <button onClick={props.onNewCard}>Add New Card</button>
    </div>
  );
}

export default NewCard;
