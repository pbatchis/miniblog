package com.pbatchis.miniblog.payload.response;

public class MessageResponseBody {

    private String message;

    public static MessageResponseBody of(String message) {
        return new MessageResponseBody(message);
    }

    public static MessageResponseBody of(String message, Object... args) {
        return new MessageResponseBody(String.format(message, args));
    }

    private MessageResponseBody(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
