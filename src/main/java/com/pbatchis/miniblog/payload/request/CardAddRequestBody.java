package com.pbatchis.miniblog.payload.request;

/**
 * Request body for adding a card.
 */
public class CardAddRequestBody {

    private String name;

    private String status;

    private String content;

    private String category;

    public CardAddRequestBody() {
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
}
