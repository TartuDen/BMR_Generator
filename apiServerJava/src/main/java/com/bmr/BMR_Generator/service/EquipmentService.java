package com.bmr.BMR_Generator.service;

import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.rest.response.EquipmentResponse;

import java.util.List;

public interface EquipmentService {
    EquipmentResponse saveEquipment(Equipment equipment);
    List<Equipment> getAllEquipment();
    EquipmentResponse updateEquipment(long id, Equipment equipment);
}
