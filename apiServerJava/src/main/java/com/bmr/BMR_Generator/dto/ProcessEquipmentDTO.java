package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.ProcessEquipment;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import com.bmr.BMR_Generator.entity.TypicalActivity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProcessEquipmentDTO {
    @NonNull
    private String name;
    
    @NonNull
    private String code;
    
    public ProcessEquipmentDTO(ProcessEquipment processEquipment) {
        this.name = processEquipment.getName();
        this.code = processEquipment.getCode();
    }
}
