package com.pbatchis.miniblog.payload.request;

/**
 * Request body for registering a new user.
 */
public class AuthRegisterRequestBody {

    private String username;

    private String password;

    public AuthRegisterRequestBody() {
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
