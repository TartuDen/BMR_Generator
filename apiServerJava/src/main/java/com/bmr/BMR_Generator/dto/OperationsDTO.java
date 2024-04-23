package com.bmr.BMR_Generator.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class OperationsDTO {
    private long id;
    
    @NonNull
    private String operationType;
    
    @NonNull
    private String content;
    
    private String other;
}
