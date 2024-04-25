package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.rest.response.Response;

import java.sql.Date;
import java.time.LocalDate;

public abstract class BaseService {
    
    protected Response generateResponse(int status, String message) {
        Response response = new Response();
        response.setStatus(status);
        response.setMessage(message);
        response.setTimeStamp(Date.valueOf(LocalDate.now()));
        return response;
    }
}