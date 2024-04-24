package com.bmr.BMR_Generator.dto;

import com.bmr.BMR_Generator.entity.EquipmentInfo;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class EquipmentInfoDTO {
    private long id;
    
    @NonNull
    private String code;
    
    @NonNull
    private String description;
    
    public EquipmentInfoDTO(EquipmentInfo equipmentInfo){
        this.id = equipmentInfo.getId();
        this.code = equipmentInfo.getCode();
        this.description = equipmentInfo.getDescription();
    }
}
