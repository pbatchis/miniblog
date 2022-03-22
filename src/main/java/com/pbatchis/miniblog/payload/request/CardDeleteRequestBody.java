package com.pbatchis.miniblog.payload.request;

/**
 * Request body for deleting a card.
 */
public class CardDeleteRequestBody {

    private Long id;

    public CardDeleteRequestBody() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}