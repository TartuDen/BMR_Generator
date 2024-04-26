package com.bmr.BMR_Generator.rest.response;

public class BrApiServerException extends RuntimeException{
    public BrApiServerException(String message) {
        super(message);
    }
    
    public BrApiServerException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public BrApiServerException(Throwable cause) {
        super(cause);
    }
}
