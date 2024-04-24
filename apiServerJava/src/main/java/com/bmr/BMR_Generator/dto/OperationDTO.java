package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.Operation;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class OperationDTO {
    private long id;
    
    @NonNull
    private String operationType;
    
    @NonNull
    private String content;
    
    private String other;
    
    public OperationDTO (Operation operation){
        this.id = operation.getId();
        this.operationType = operation.getOperationType();
        this.content = operation.getContent();
        this.other = operation.getOther();
    }
}
