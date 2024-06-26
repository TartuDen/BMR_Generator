package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.dto.EquipmentDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutInfoDTO;
import com.bmr.BMR_Generator.dto.EquipmentWithoutOperationsDTO;
import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.EquipmentInfo;

import java.util.List;

public interface EquipmentDAO {
    void save (Equipment equipment);
    
    boolean deleteByName (String name);
    void update(Equipment equipment, long id);
    List<Equipment> findAllEquipment();
    
    List<EquipmentWithoutOperationsDTO> findAllEquipmentExcludeOperations();
    
    List<EquipmentWithoutInfoDTO> findAllEquipmentExcludeInfo();
    
    EquipmentDTO findEquipmentByID(long id);
    EquipmentDTO findEquipmentByName(String name);
    long getEquipmentIDbyName(String name);
    
    void addEquipmentInfoToEquipmentByName(String equipmentName, EquipmentInfo equipmentInfo);
    void deleteEquipmentInfoFromEquipmentByName(String equipmentName, String equipmentInfoCode);
}
