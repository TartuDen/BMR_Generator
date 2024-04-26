package com.bmr.BMR_Generator.rest.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler
    public ResponseEntity<Response> notFoundHandler (BrApiServerException exc){
        var error = new Response();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new java.util.Date());
        
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    
    @org.springframework.web.bind.annotation.ExceptionHandler
    public ResponseEntity<Response> handleException(Exception exc) {
        var error = new Response();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new java.util.Date());
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @org.springframework.web.bind.annotation.ExceptionHandler
    public ResponseEntity<Response> badRequestParameters (NotAllowedRequestParameters exc){
        var error = new Response();
        error.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new java.util.Date());
        
        return new ResponseEntity<>(error, HttpStatus.NOT_ACCEPTABLE);
    }
    
}
