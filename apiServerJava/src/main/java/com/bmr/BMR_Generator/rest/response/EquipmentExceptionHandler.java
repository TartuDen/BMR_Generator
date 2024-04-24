package com.bmr.BMR_Generator.rest.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class EquipmentExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<EquipmentResponse> notFoundHandler (EquipmentNotFoundException exc){
        var error = new EquipmentResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new java.util.Date());
        
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler
    public ResponseEntity<EquipmentResponse> handleException(Exception exc) {
        var error = new EquipmentResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(new java.util.Date());
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
