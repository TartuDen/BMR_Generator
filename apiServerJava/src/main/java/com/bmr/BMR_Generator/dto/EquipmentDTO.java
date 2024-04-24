package com.bmr.BMR_Generator.dto;


import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.Operation;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class EquipmentDTO {
    private long id;
    
    @NonNull
    private String name;
    
    private List<EquipmentInfoDTO> equipmentInfo;
    private List<OperationDTO> operations;
    
    public EquipmentDTO (Equipment equipment){
        this.id = equipment.getId();
        this.name = equipment.getName();
        this.equipmentInfo = equipment.getEquipmentInfo().stream()
                .map(EquipmentInfoDTO::new)
                .collect(Collectors.toList());
        this.operations = equipment.getOperations().stream()
                .map(OperationDTO::new)
                .collect(Collectors.toList());;
    }
}