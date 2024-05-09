package com.bmr.BMR_Generator.rest.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Date;


/**
 * Represents the structure of the response returned by the controller in case of exceptions.
 */
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Response {
        @NonNull
        private Integer status;
        @NonNull
        private String message;
        @NonNull
        private Date timeStamp;
}
