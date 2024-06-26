package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.Operation;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class OperationDTO {
    @NonNull
    private String operationType;
    
    @NonNull
    @Column(length = 500)
    private String content;
    
    private String other;
    
    public OperationDTO (Operation operation){
        this.operationType = operation.getOperationType();
        this.content = operation.getContent();
        this.other = operation.getOther();
    }
}
