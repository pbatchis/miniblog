package com.pbatchis.miniblog.payload.response;

/**
 * Response body for adding a card.
 */
public class CardAddResponseBody {
    
    private Long id;

    private CardAddResponseBody(Long id) {
        this.id = id;
    }

    public static CardAddResponseBody of(Long id) {
        return new CardAddResponseBody(id);
    }

    public Long getId() {
        return id;
    }
}
