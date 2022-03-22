package com.pbatchis.miniblog.payload.response;

import com.pbatchis.miniblog.domain.Card;

/**
 * A card, to be used in a response body.
 */
public class CardInfo {

    private Long id;

    private String name;

    private String status;

    private String content;

    private String category;

    private String author;

    public CardInfo(Card card) {
        id = card.getId();
        name = card.getName();
        status = card.getStatus();
        content = card.getContent();
        category = card.getCategory();
        author = card.getAuthor().getUsername();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
