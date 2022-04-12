import React, { useState } from 'react';

function Card(props) {
    
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    
    function handleEdit() {
        props.onEdit(props.id);
    }    

    function handleDelete() {
        setConfirmingDelete(true);
    }    

    function handleCancelDelete() {
        setConfirmingDelete(false);
    }    

    function handleConfirmDelete() {
        props.onDelete(props.id);
    }    

    function isEditable() {
        return (props.author === props.signedInUsername);
    }    

    return (
        <div className="Card">
            {confirmingDelete &&
                <div className="confirmDelete">
                    <div>Are you sure you want to Delete this card?</div>
                    <div className="confirmDeleteButtons">
                        <button onClick={handleCancelDelete}>Cancel</button>
                        <button onClick={handleConfirmDelete}>Yes, Delete</button>
                    </div>
                </div>
            }
            <div className="row1">
                <div className="category">{props.category}</div>
                {isEditable() && !confirmingDelete &&
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                }
            </div>
            <div className="name">{props.name}</div>
            <div className="content">{props.content}</div>
            <div className="status">{props.status}</div>
            <div className="author">{props.author}</div>
        </div>
    );
}

export default Card;
