package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.EquipmentDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;

import java.util.List;

public interface EquipmentDAO {
    boolean save (Equipment equipment);
    
    boolean deleteByName (String name);
    boolean update(Equipment equipment, long id);
    List<Equipment> findAllEquipment();
    
    List<EquipmentWithoutOperationsDTO> findAllEquipmentExcludeOperations();
    
    List<EquipmentWithoutInfoDTO> findAllEquipmentExcludeInfo();
    
    EquipmentDTO findEquipmentByID(long id);
    EquipmentDTO findEquipmentByName(String name);
}
