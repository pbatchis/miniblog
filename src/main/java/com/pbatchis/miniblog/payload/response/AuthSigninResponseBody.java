package com.pbatchis.miniblog.payload.response;

public class AuthSigninResponseBody {

    private String token;

    private String type = "Bearer";

    private String username;

    public static AuthSigninResponseBody of(String accessToken, String username) {
        return new AuthSigninResponseBody(accessToken, username);
    }

    private AuthSigninResponseBody(String accessToken, String username) {
        this.token = accessToken;
        this.username = username;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
