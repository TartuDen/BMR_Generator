package com.bmr.BMR_Generator.dto;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class EquipmentWithoutInfoDTO {
    @NonNull
    private String name;
    
    private List<OperationDTO> operations;
}
