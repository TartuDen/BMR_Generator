package com.bmr.BMR_Generator.rest.response;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String message) {
        super(message);
    }
    
    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public NotFoundException(Throwable cause) {
        super(cause);
    }
}
