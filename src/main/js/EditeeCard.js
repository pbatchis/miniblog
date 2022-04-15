import React, { useState } from "react";
import postAuthJson from "./postAuthJson";

function EditeeCard(props) {
  const [category, setCategory] = useState(props.category);
  const [name, setName] = useState(props.name);
  const [content, setContent] = useState(props.content);
  const [status, setStatus] = useState(props.status);

  function handleChangeCategory(event) {
    setCategory(event.target.value);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeContent(event) {
    setContent(event.target.value);
  }

  function handleChangeStatus(event) {
    setStatus(event.target.value);
  }

  function handleEditCancel() {
    props.onEndEdit(props.id);
  }

  function handleEditOk() {
    if (props.id === -1) {
      addCard();
    } else {
      editCard();
    }
  }

  function addCard() {
    postAuthJson("/api/card/add", props.jwtToken, {
      name: name,
      status: status,
      content: content,
      category: category,
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          props.onEndEditAndAdd(data.id, name, status, content, category);
        });
      }
    });
  }

  function editCard() {
    // Save the card state, then end the edit session and update card state.
    postAuthJson("/api/card/edit", props.jwtToken, {
      id: props.id,
      name: name,
      status: status,
      content: content,
      category: category,
    }).then((response) => {
      if (response.ok) {
        props.onEndEditAndUpdate(props.id, name, status, content, category);
      }
    });
  }

  return (
    <div className="EditeeCard Card">
      <div className="row1">
        <input
          className="category textInput"
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChangeCategory}
          value={category}
        />
        <div></div>
      </div>
      <input
        className="name textInput"
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChangeName}
        value={name}
      />
      <textarea
        className="content textInput"
        name="content"
        placeholder="Content"
        onChange={handleChangeContent}
        value={content}
      />
      <input
        className="status textInput"
        type="text"
        name="status"
        placeholder="Status"
        onChange={handleChangeStatus}
        value={status}
      />
      <div className="author">{props.author}</div>
      <div className="okCancelButtons">
        <button onClick={handleEditCancel}>Cancel</button>
        <button onClick={handleEditOk}>OK</button>
      </div>
    </div>
  );
}

export default EditeeCard;
