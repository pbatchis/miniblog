package com.pbatchis.miniblog.payload.response;

import java.util.ArrayList;
import java.util.List;
import com.pbatchis.miniblog.domain.Card;

/**
 * A list of cards, to be used in a response body.
 */
public class CardList extends ArrayList<CardInfo> {

    public CardList(List<Card> cards) {
        for (Card card : cards) {
            add(new CardInfo(card));
        }
    }
}
