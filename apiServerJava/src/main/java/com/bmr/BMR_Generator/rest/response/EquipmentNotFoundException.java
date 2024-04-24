package com.bmr.BMR_Generator.rest.response;

public class EquipmentNotFoundException extends RuntimeException{
    public EquipmentNotFoundException(String message) {
        super(message);
    }
    
    public EquipmentNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public EquipmentNotFoundException(Throwable cause) {
        super(cause);
    }
}
