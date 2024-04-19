package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.Equipment;

import java.util.List;

public interface EquipmentDAO {
    boolean save (Equipment equipment);
    List<Equipment> findAllEquipment();
}
