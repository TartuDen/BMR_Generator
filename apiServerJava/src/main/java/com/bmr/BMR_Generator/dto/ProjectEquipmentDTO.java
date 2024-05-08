package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.ProjectEquipment;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ProjectEquipmentDTO {
    @NonNull
    private String code;
    
    
    @NonNull
    private String name;
    
    public ProjectEquipmentDTO(ProjectEquipment projectEquipment) {
        this.code = projectEquipment.getCode();
        this.name = projectEquipment.getName();
    }
}
