package com.pbatchis.miniblog.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

/**
 * A card is an entry in the blog.
 * Each card has an author (the user who originally 
 * added the card) who has ownership privlage. 
 * Only the author can edit or delete a card.
 */
@Entity
@Table(name = "card")
public class Card {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @Version
	private long version;

	private String name;

    private String status;

    private String content;

    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
    private User author;

	public Card() {
	}

    public Card(String name, String status, String content, String category, User author) {
		this.name = name;
		this.status = status;
        this.content = content;
        this.category = category;
        this.author = author;
	}

    public Long getId() {
		return id;
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
