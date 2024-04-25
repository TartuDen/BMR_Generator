package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.dto.EquipmentDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.rest.response.Response;

import java.util.List;

public interface EquipmentService {
    Response saveEquipment(Equipment equipment);
    List<Equipment> getAllEquipment();
    Response updateEquipment(long id, Equipment equipment);
    
    List<EquipmentWithoutOperationsDTO> getAllEquipmentExcludeOperations();
    List<EquipmentWithoutInfoDTO> getAllEquipmentExcludeInfo();
    
    EquipmentDTO getEquipmentByID(long id);
}

