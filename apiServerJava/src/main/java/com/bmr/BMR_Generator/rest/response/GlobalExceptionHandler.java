package com.bmr.BMR_Generator.rest.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BrApiServerException.class)
    public ResponseEntity<Response> notFoundHandler(BrApiServerException exc) {
        Response error = new Response();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new Date());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(NotAllowedRequestParameters.class)
    public ResponseEntity<Response> badRequestParameters(NotAllowedRequestParameters exc) {
        Response error = new Response();
        error.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new Date());
        return new ResponseEntity<>(error, HttpStatus.NOT_ACCEPTABLE);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handleException(Exception exc) {
        Response error = new Response();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new Date());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
