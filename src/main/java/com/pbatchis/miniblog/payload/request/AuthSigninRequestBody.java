package com.pbatchis.miniblog.payload.request;

public class AuthSigninRequestBody {

    private String username;

	private String password;

	public AuthSigninRequestBody() {}

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