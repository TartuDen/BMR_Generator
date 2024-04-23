package com.bmr.BMR_Generator.dto;

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
}
