package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.Parameter;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ParameterDTO {
    @NonNull
    private String name;
    
    public ParameterDTO (Parameter parameter) {
        this.name = parameter.getName();
    }
}
