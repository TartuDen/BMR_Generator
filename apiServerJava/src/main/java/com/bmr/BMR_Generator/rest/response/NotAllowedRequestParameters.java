package com.bmr.BMR_Generator.rest.response;

public class NotAllowedRequestParameters extends RuntimeException{
    public NotAllowedRequestParameters(String message) {
        super(message);
    }
    
    public NotAllowedRequestParameters(String message, Throwable cause) {
        super(message, cause);
    }
    
    public NotAllowedRequestParameters(Throwable cause) {
        super(cause);
    }
}