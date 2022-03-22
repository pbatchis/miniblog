package com.pbatchis.miniblog.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

/**
 * A user of the application.
 * The user data is persisted in the database and used 
 * for authentication and authorization.
 * 
 * The table is named "app_user" so not to conflict with  
 * the reserved word "user" in PostgreSQL database 
 * referencing a user of the database management system.
 */
@Entity
@Table(name = "app_user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @Version
    private long version;

	@Column(unique = true)
	private String username;

	private String password;

	public User() {
	}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
