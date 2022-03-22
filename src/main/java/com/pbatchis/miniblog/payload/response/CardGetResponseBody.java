package com.pbatchis.miniblog.payload.response;

import java.util.List;

import com.pbatchis.miniblog.domain.Card;

/**
 * Response body for getting cards.
 */
public class CardGetResponseBody {

    private CardList cards;

    public static CardGetResponseBody of(List<Card> cards) {
        CardList cardList = new CardList(cards);
        return new CardGetResponseBody(cardList);
    }

    private CardGetResponseBody(CardList cardList) {
        this.cards = cardList;
    }

    public CardList getCards() {
        return cards;
    }

    public void setCards(CardList cards) {
        this.cards = cards;
    }
}
