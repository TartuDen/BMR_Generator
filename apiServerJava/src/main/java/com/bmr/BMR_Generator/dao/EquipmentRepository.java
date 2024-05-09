package com.bmr.BMR_Generator.dao;

import com.bmr.BMR_Generator.entity.Equipment;
import com.bmr.BMR_Generator.entity.ProcessOperation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}
